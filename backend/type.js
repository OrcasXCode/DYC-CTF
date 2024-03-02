// const zod = require("zod");

// const MemberSchema = zod.object({
//   name: zod.string(),
//   id: zod.number().min(8).max(8, { message: "Must be of 8 digits" }),
//   phoneNumber: zod
//     .number()
//     .min(10)
//     .max(10, { message: "Must be of 10 digits" }),
//   email: zod.string().email({ message: "Invalid Email Address" }),
// });

// const TeamCreate = zod.object({
//   teamName: zod.string(),
//   teamLeaderName: zod.string(),
//   teamLeaderEmail: zod.string().email({ message: "Invalid Email Address" }),
//   teamLeaderId: zod.number().min(8).max(8, { message: "Must be of 8 digits" }),
//   teamLeaderNo: zod
//     .number()
//     .min(10)
//     .max(10, { message: "Must be of 10 digits" }),
//   members: zod.array(MemberSchema),
// });

// module.exports = {
//   TeamCreate,
// };

const zod = require("zod");

const MemberSchema = zod.object({
  name: zod.string(),
  id: zod.number(),
  phoneNumber: zod.number(),
  email: zod.string().email(),
});

const TeamCreate = zod.object({
  teamLeaderName: zod.string(),
  teamLeaderEmail: zod.string().email(),
  teamLeaderId: zod.number(),
  teamLeaderNo: zod.number(),
  members: zod.array(MemberSchema),
});

module.exports = {
  TeamCreate,
};
