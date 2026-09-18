const reportService =
require("../services/reportService");

exports.getDecisionReport =
async(req,res)=>{

const report =
await reportService
.generateDecisionReport(
req.params.id
);

res.json(report);

};