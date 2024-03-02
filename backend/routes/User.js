const { Router } = require("express");
const router = Router();
const { TeamCreate } = require("../type");
const { Team } = require("../model/team");

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
      !teamLeaderEmail
    ) {
      return res
        .status(401)
        .json({ success: false, msg: "All fields are required" });
    }
    try {
      TeamCreate.parse(req.body);
    } catch (error) {
      return res.status(400).json({ success: false, msg: error.message });
    }

    const newTeam = await Team.create({
      teamName,
      teamLeaderName,
      teamLeaderId,
      teamLeaderEmail,
      teamLeaderNo,
      members,
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
