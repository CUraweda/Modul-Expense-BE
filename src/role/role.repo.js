const prismaClient = require("../config/prisma.db");

const getRole = async () => {
  return await prismaClient.role.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = { getRole };
