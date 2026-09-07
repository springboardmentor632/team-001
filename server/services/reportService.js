const Decision =
require("../models/Decision");

const Poll =
require("../models/Poll");

exports.generateDecisionReport =
async(id)=>{

const decision =
await Decision.findById(id);

return {

decisionTitle:
decision.title,

createdAt:
decision.createdAt

};

};