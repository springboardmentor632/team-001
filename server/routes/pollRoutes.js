const express = require("express");

const router = express.Router();

const {
    createPoll,
    getAllPolls,
    getPollById,
    deletePoll,
    castVote,
    getPollResults,
    getTotalVotes,
    verifyPollAccess,
    getTotalPolls,
    removeVote
} = require("../controllers/pollController");

router.post("/", createPoll);

router.get("/", getAllPolls);

router.get("/votes/total", getTotalVotes);

router.get("/total", getTotalPolls);

router.post("/vote/cast", castVote);

router.delete("/vote/:voteId", removeVote);

router.get("/:id", getPollById);

router.post("/:id/verify-access", verifyPollAccess);

router.delete("/:id", deletePoll);

router.get("/:id/results", getPollResults);

module.exports = router;