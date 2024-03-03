const zod = require("zod");

const MemberSchema = zod.object({
  name: zod.string(),
  id: zod.string().length(8), // Validate id as string with length 8
  phoneNumber: zod.string().length(10), // Validate phoneNumber as string with length 10
  email: zod.string().email(),
});

const TeamCreate = zod.object({
  teamName: zod.string(),
  teamLeaderName: zod.string(),
  teamLeaderEmail: zod.string().email(),
  teamLeaderId: zod.string().length(8), // Validate teamLeaderId as string with length 8
  teamLeaderNo: zod.string().length(10), // Validate teamLeaderNo as string with length 10
  members: zod.array(MemberSchema),
});

module.exports = {
  TeamCreate,
};
