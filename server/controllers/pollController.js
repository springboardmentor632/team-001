const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

// CREATE POLL
const createPoll = async (req, res) => {
    try {
        const { visibility, accessCode } = req.body;

        if (visibility === "private" && !accessCode) {
            return res.status(400).json({
                message: "Access code is required for private polls"
            });
        }

        const poll = new Poll(req.body);
        const savedPoll = await poll.save();

        res.status(201).json({
            message: "Poll created successfully",
            poll: savedPoll
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating poll",
            error: error.message
        });
    }
};


// GET ALL POLLS
const getAllPolls = async (req, res) => {
    try {
        const { visibility } = req.query;
        const filter = visibility ? { visibility } : { visibility: "public" };
        const polls = await Poll.find(filter);
        res.status(200).json(polls);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching polls",
            error: error.message
        });
    }
};

// VERIFY PRIVATE POLL ACCESS CODE
const verifyPollAccess = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        if (!poll) return res.status(404).json({ message: "Poll not found" });
        if (poll.visibility !== "private") return res.status(200).json({ access: true });
        if (!poll.accessCode) return res.status(200).json({ access: true });
        if (req.body.accessCode !== poll.accessCode) {
            return res.status(403).json({ message: "Invalid access code" });
        }
        res.status(200).json({ access: true });
    } catch (error) {
        res.status(500).json({ message: "Error verifying access", error: error.message });
    }
};

// GET ONE POLL
const getPollById = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);

        if (!poll) {
            return res.status(404).json({
                message: "Poll not found"
            });
        }

        res.status(200).json(poll);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching poll",
            error: error.message
        });
    }
};


// UPDATE POLL
const updatePoll = async (req, res) => {
    try {
        const poll = await Poll.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!poll) {
            return res.status(404).json({
                message: "Poll not found"
            });
        }

        res.status(200).json({
            message: "Poll updated successfully",
            poll
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating poll",
            error: error.message
        });
    }
};

// DELETE POLL
const deletePoll = async (req, res) => {
    try {
        const poll = await Poll.findByIdAndDelete(req.params.id);

        if (!poll) {
            return res.status(404).json({
                message: "Poll not found"
            });
        }

        // Delete votes associated with this poll
        await Vote.deleteMany({
            poll: req.params.id
        });

        res.status(200).json({
            message: "Poll deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting poll",
            error: error.message
        });
    }
};

// CAST VOTE
const castVote = async (req, res) => {
    try {
        const {
            pollId,
            user,
            selectedOptions,
            rating
        } = req.body;

        // 1. Check poll ID
        if (!pollId) {
            return res.status(400).json({
                message: "Poll ID is required"
            });
        }

        // 2. Find poll
        const poll = await Poll.findById(pollId);

        if (!poll) {
            return res.status(404).json({
                message: "Poll not found"
            });
        }

        // 3. Check active poll
        if (!poll.isActive) {
            return res.status(400).json({
                message: "Poll is not active"
            });
        }

        // 4. Check poll dates
        const currentDate = new Date();

        if (poll.startDate && currentDate < poll.startDate) {
            return res.status(400).json({
                message: "Poll has not started yet"
            });
        }

        if (poll.endDate && currentDate > poll.endDate) {
            return res.status(400).json({
                message: "Poll has ended"
            });
        }

        // 5. Validate SINGLE choice
        if (poll.pollType === "single") {

            if (!selectedOptions || selectedOptions.length !== 1) {
                return res.status(400).json({
                    message: "Single choice poll requires exactly one option"
                });
            }
        }

        // 6. Validate MULTIPLE choice
        if (poll.pollType === "multiple") {

            if (!selectedOptions || selectedOptions.length < 1) {
                return res.status(400).json({
                    message: "Select at least one option"
                });
            }
        }


        // 7. Validate RATING poll
        if (poll.pollType === "rating") {

            if (rating === undefined || rating === null) {
                return res.status(400).json({
                    message: "Rating is required"
                });
            }

            if (rating < 1 || rating > 5) {
                return res.status(400).json({
                    message: "Rating must be between 1 and 5"
                });
            }
        }

        // 8. Validate selected options
        if (
            poll.pollType === "single" ||
            poll.pollType === "multiple"
        ) {

            const pollOptionIds = poll.options.map(
                option => option._id.toString()
            );

            for (const selectedOption of selectedOptions) {

                if (!pollOptionIds.includes(selectedOption.toString())) {
                    return res.status(400).json({
                        message: "Selected option does not belong to this poll"
                    });
                }
            }
        }


        // 9. Create vote
        const vote = new Vote({
            poll: pollId,
            user: poll.anonymous ? undefined : (user || undefined),
            selectedOptions:
                poll.pollType === "rating"
                    ? []
                    : selectedOptions,
            rating:
                poll.pollType === "rating"
                    ? rating
                    : undefined
        });

        // 10. Save vote
        const savedVote = await vote.save();

        // 11. Send response
        res.status(201).json({
            message: "Vote submitted successfully",
            vote: savedVote
        });

    } catch (error) {

        console.error("Vote error:", error);

        res.status(500).json({
            message: "Error submitting vote",
            error: error.message
        });
    }
};


// =========================
// GET POLL RESULTS
// =========================
const getPollResults = async (req, res) => {
    try {

        const pollId = req.params.id;


        // Find poll
        const poll = await Poll.findById(pollId);

        if (!poll) {
            return res.status(404).json({
                message: "Poll not found"
            });
        }


        // Find votes
        const votes = await Vote.find({
            poll: pollId
        });

        // Calculate option counts
        const optionResults = poll.options.map(option => {

            let count = 0;

            votes.forEach(vote => {

                if (vote.selectedOptions) {

                    vote.selectedOptions.forEach(
                        selectedOption => {

                            if (
                                selectedOption.toString() ===
                                option._id.toString()
                            ) {
                                count++;
                            }
                        }
                    );
                }
            });

            return {
                optionId: option._id,
                optionText: option.text,
                votes: count
            };
        });


        // Calculate rating results
        let averageRating = null;

        if (poll.pollType === "rating") {

            const ratings = votes
                .filter(vote => vote.rating !== undefined)
                .map(vote => vote.rating);

            if (ratings.length > 0) {

                const totalRating = ratings.reduce(
                    (sum, rating) => sum + rating,
                    0
                );

                averageRating = totalRating / ratings.length;
            }
        }


        // Response
        res.status(200).json({
            pollId: poll._id,
            question: poll.question,
            pollType: poll.pollType,
            totalVotes: votes.length,
            optionResults,
            averageRating
        });

    } catch (error) {

        console.error("Results error:", error);

        res.status(500).json({
            message: "Error fetching results",
            error: error.message
        });
    }
};

// REMOVE VOTE
const removeVote = async (req, res) => {
    try {
        const vote = await Vote.findByIdAndDelete(req.params.voteId);
        if (!vote) return res.status(404).json({ message: "Vote not found" });
        res.status(200).json({ message: "Vote removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing vote", error: error.message });
    }
};

// GET TOTAL VOTES
const getTotalVotes = async (req, res) => {
    try {
        const count = await Vote.countDocuments();
        res.status(200).json({ totalVotes: count });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total votes", error: error.message });
    }
};

// GET TOTAL POLLS
const getTotalPolls = async (req, res) => {
    try {
        const count = await Poll.countDocuments();
        res.status(200).json({ totalPolls: count });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total polls", error: error.message });
    }
};

// EXPORT FUNCTIONS
module.exports = {
    createPoll,
    getAllPolls,
    getPollById,
    updatePoll,
    deletePoll,
    castVote,
    getPollResults,
    getTotalVotes,
    getTotalPolls,
    verifyPollAccess,
    removeVote
};