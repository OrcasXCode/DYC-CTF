const { Router } = require("express");
const router = Router();
const { TeamCreate } = require("../type");
const { Team } = require("../model/team");
const { memberPending } = require("../mail/tempelates/memebrsPending");
const { leaderPending } = require("../mail/tempelates/leaderpending");
const mailSender = require("../utils/mailSender");

const generateUniqueTeamId = async () => {
  let teamId = "";
  let isUnique = false;

  while (!isUnique) {
    teamId = Math.floor(100000 + Math.random() * 900000)
      .toString()
      .substring(0, 6);
    const existingTeam = await Team.findOne({ teamId });
    if (!existingTeam) {
      isUnique = true;
    }
  }

  return teamId;
};

router.post("/register", async (req, res) => {
  try {
    const {
      teamName,
      teamLeaderName,
      teamLeaderId,
      teamLeaderNo,
      teamLeaderEmail,
      members,
    } = req.body;
    if (
      !teamName ||
      !teamLeaderName ||
      !teamLeaderId ||
      !teamLeaderNo ||
      !teamLeaderEmail ||
      !members
    ) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }
    try {
      TeamCreate.parse(req.body);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, msg: error.message });
    }

    return res.status(200).json({
      success: true,
      message: "Team Credentials verifed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
});

router.post("/verify-payment", async (req, res) => {
  try {
    const {
      teamName,
      teamLeaderName,
      teamLeaderId,
      teamLeaderNo,
      teamLeaderEmail,
      members,
    } = req.body;

    const transId = req.body.transId;
    if (
      !teamName ||
      !teamLeaderName ||
      !teamLeaderId ||
      !teamLeaderNo ||
      !teamLeaderEmail ||
      !members
    ) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }
    if (!transId) {
      return res.status(400).json({
        success: false,
        msg: "Transaction ID not found",
      });
    }
    if (transId.length != 12) {
      return res.status(401).json({
        success: false,
        msg: "Invalid Transaction ID",
      });
    }
    const teamId = await generateUniqueTeamId();
    const newTeam = await Team.create({
      teamName,
      teamId,
      teamLeaderName,
      teamLeaderId,
      teamLeaderEmail,
      teamLeaderNo,
      members: members.map((member) => ({ ...member, teamId })),
    });

    // Send email to team leader
    const LeaderMail = await mailSender(
      teamLeaderEmail,
      "Payment Verification Pending",
      leaderPending(teamLeaderEmail, teamName)
    );

    // Send email to all other participants
    members.forEach(async (participant) => {
      const mail = participant.email;
      await mailSender(
        participant.email,
        "Payment Verification Pending",
        memberPending(mail, teamName, teamLeaderName)
      );
    });

    return res.status(200).json({
      success: true,
      message: "Team created successfully",
      newTeam,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
});

module.exports = router;
