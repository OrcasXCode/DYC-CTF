const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const TeamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    teamLeaderName: {
      type: String,
      required: true,
    },
    teamLeaderId: {
      type: String,
      required: true,
    },
    teamLeaderNo: {
      type: String,
      required: true,
    },
    teamLeaderEmail: {
      type: String,
      required: true,
    },
    members: [ParticipantSchema],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", TeamSchema);
module.exports = {
  Team,
};
