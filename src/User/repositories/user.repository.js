const prismaClient = require("../../config/prisma.db");
const {
  GeneralError,
  ValidationError,
} = require("../../exceptions/errors.exception");
const bcryptHelper = require("../../helpers/bcrypt.helper");

const getUsers = async () => {
  return await prismaClient.user.findMany({
    include: {
      role: true,
      kategoriUser: true
    },
  });
};

const getUser = async (userId) => {
  return await prismaClient.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });
};

const getUserByEmail = async (email) => {
  return await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    include: {
      kategoriUser: true
    }
  });
};

const createUser = async (user) => {
  try {
    return await prismaClient.$transaction(async (prisma) => {
      user.password = await bcryptHelper.hash(user.password);
      const userPayload = {
        email: user.email,
        name: user.name,
        roleId: user.role,
        password: user.password,
      };
      if (user.kategoriUserId) {
        userPayload.kategoriUserId = user.kategoriUserId;
      }
      const createdUser = await prisma.user.create({
        data: userPayload,
      });

      return createdUser;
    });
  } catch (error) {
    throw new ValidationError(error);
  }
};
const updatePassword = async (id, user) => {
  try {
    return await prismaClient.$transaction(async (prisma) => {
      user.password = await bcryptHelper.hash(user.password);

      const createdUser = await prisma.user.update({
        where: { id },
        data: {
          password: user.password,
        },
      });

      return createdUser;
    });
  } catch (error) {
    throw new ValidationError(error);
  }
};

const deleteUser = async (userId) => {
  return await prismaClient.user.delete({
    where: {
      id: parseInt(userId),
    },
  });
};

const updateUser = async (userId, user) => {
  const userPayload = {
    email: user.email,
    name: user.name,
    roleId: user.roleId,
  };
  if (user.kategoriUserId) {
    userPayload.kategoriUserId = user.kategoriUserId;
  }

  return await prismaClient.user.update({
    where: {
      id: parseInt(userId),
    },
    data: userPayload,
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getUserByEmail,
  updatePassword,
};
