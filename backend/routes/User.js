const { Router } = require("express");
const router = Router();
const { TeamCreate } = require("../type");
const { Team } = require("../model/team");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { confrimMailParticipant } = require("../mail/tempelates/participant");
const { confrimMailLeader } = require("../mail/tempelates/leader");
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

// Route to register a team
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

    const teamId = await generateUniqueTeamId();

    // Create the team in the database
    const newTeam = await Team.create({
      teamName,
      teamId, // Assign the generated team ID
      teamLeaderName,
      teamLeaderId,
      teamLeaderEmail,
      teamLeaderNo,
      members: members.map((member) => ({ ...member, teamId })),
    });

    // Send email to team leader
    const LeaderMail = await mailSender(
      teamLeaderEmail,
      "Team Registered Successfully",
      confrimMailLeader(teamLeaderEmail, teamName, teamId)
    );

    // Send email to all other participants
    members.forEach(async (participant) => {
      const mail = participant.email;
      await mailSender(
        participant.email,
        "Team Registered Successfully",
        confrimMailParticipant(mail, teamName, teamId, teamLeaderName)
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

// Route to handle payment orders
router.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

// Route to validate payment orders
router.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  // If payment is validated successfully, send the confirmation response
  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

module.exports = router;
