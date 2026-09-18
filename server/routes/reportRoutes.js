const express =
require("express");

const router =
express.Router();

const {
getDecisionReport
}
=
require("../controllers/reportController");

router.get(
"/decision/:id",
getDecisionReport
);

module.exports = router;