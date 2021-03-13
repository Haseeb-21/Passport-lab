const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

const findOrCreate = (profile, callback) => {
  let user = userModel.findById(profile.id);
  if(user){
    callback(null, user);
  }
  else{
    userModel.addtoDatabase({
      id: profile.id,
      name: profile.name,
    });
    let user = userModel.findById(profile.id);
    callback(null, user);
  }
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreate,
};
