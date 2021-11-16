const profileModel = require("../models/profileSchema");
const globalModel = require("../models/globalSchema");

await profileModel.updateMany({dailyClaim: true}, {"$set": {dailyClaim: false}});
await globalModel.findOneAndUpdate({globalId: 404}, {"$set": {dailyCount: 0}});
console.log("Daily reset succeded!");