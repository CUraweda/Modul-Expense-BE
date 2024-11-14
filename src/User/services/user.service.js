const { GeneralError } = require("../../exceptions/errors.exception");
const userRepository = require("../repositories/user.repository");
const httpStatus = require("http-status-codes");

const getUsers = async () => {
  const query = await userRepository.getUsers();

  return query;
};

const getUser = async (userId) => {
  const user = await userRepository.getUser(userId);
  if (!user) {
    throw new GeneralError("NOT_FOUND", httpStatus.StatusCodes.NOT_FOUND);
  }

  return user;
};

const createUser = async (user) => {
  const createdUser = await userRepository.createUser(user);

  return createdUser;
};

const deleteUser = async (userId) => {
  await getUser(userId);
  return userRepository.deleteUser(userId);
};

const updateUser = async (userId, data) => {
  await getUser(userId);

  const updatedUser = await userRepository.updateUser(userId, data);
  return updatedUser;
};

module.exports = { getUsers, getUser, createUser, deleteUser, updateUser };
