// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const userRouter = require("./routes/User");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const database = require("./config/database");
// const Razorpay = require("razorpay");

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

// dotenv.config();
// database.connect();

// app.use("/user", userRouter);

// export const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routes/User");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/database");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();
database.connect();

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
