const mongoose = require("mongoose");

const individualSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profileImage: { type: String, required: false },
    email: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
});

module.exports = mongoose.model("Individual", individualSchema);
