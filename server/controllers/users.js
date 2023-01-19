const User = require('../models/users');
const message = require('../models/messages');
const addUser = async ({ id, name, room, username }) => {
  try {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = await User.findOne({ name: name, room: room });
    console.log('adf');
    if (existingUser != null) {
      return { user: existingUser };
    }

    const user = { id, name, room, username };
    const newUser = new User(user);

    const newestUser = await newUser.save();
    return { user: newestUser };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

const removeUser = async (username) => {
  try {
        const user = await User.findOneAndDelete({username:username})
  } catch (error) {
    
  }
  
};
const getUser = async (id) => {
  try {
    console.log(id);
    const user = await User.findOne({ id: id });
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUserInRoom };
