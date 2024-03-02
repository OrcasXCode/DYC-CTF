// const mongoose = require("mongoose");

// const TeamSchema = new mongoose.Schema({
//   TeamName: {
//     type: String,
//     required: true,
//   },
//   TeamLeaderName: {
//     type: String,
//     required: true,
//   },
//   TeamLeaderId: {
//     type: Number,
//     required: true,
//   },
//   TeamLeaderNo: {
//     type: Number,
//     required: true,
//   },
//   TeamLeaderEmail: {
//     type: String,
//     required: true,
//   },
//   Members: [
//     participant
//   ]
// });

// const Team = mongoose.model("Team", TeamSchema);
// module.exports = {
//   Team,
// };

const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const TeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  teamLeaderName: {
    type: String,
    required: true,
  },
  teamLeaderId: {
    type: Number,
    required: true,
  },
  teamLeaderNo: {
    type: Number,
    required: true,
  },
  teamLeaderEmail: {
    type: String,
    required: true,
  },
  members: [ParticipantSchema],
});

const Team = mongoose.model("Team", TeamSchema);
module.exports = {
  Team,
};
