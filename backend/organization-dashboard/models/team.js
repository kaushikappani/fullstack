const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Individual" }],
});

module.exports = mongoose.model("Team", teamSchema);
