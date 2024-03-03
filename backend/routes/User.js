const { Router } = require("express");
const router = Router();
const { TeamCreate } = require("../type");
const { Team } = require("../model/team");
const Razorpay = require("razorpay");
const crypto = require("crypto");

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
        .status(401)
        .json({ success: false, msg: "All fields are required" });
    }
    try {
      console.log(req.body);
      TeamCreate.parse(req.body);
    } catch (error) {
      console.log(error);
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

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});
module.exports = router;
