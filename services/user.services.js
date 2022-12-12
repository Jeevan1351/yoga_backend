const User = require("../models/user.model");
const generateToken = require("../helpers/generateToken");
const crypto = require("crypto");

// query contains email and password which is used to fetch the user profile from users collection, also returns jwt token for the user
exports.getUser = async (query) => {
  try {
    //Finding the user
    var user = await User.findOne({
      email: query.email,
    });
    //Checking if user exists
    if (!user) {
      throw Error("User not found");
    }
    //Created a digest of the password
    let digest = crypto
      .createHash("sha256", process.env.HASH_SALT)
      .update(query.password)
      .digest("hex");
    
    //Checking if the credentials are correct
    if (digest !== user.password) {
      throw Error("Incorrect email/password");
    }
    //Collecting required fields
    var semiUser = {
      email: user.email,
      role: user.role,
      name: user.name
    };
    //Generating JWT token for the extracted user
    semiUser.token = generateToken(semiUser);
    return semiUser;
  } catch (e) {
    console.log("From user.services.getUser: ", e);
    throw e;
  }
};

// Updating user password
exports.updatePassword = async (query) => {
  try {
    var digest = crypto
      .createHash("sha256", process.env.HASH_SALT)
      .update(query.password)
      .digest("hex");
    const user = await User.findOneAndUpdate(
      { email: query.email },
      {
        email: query.email,
        password: digest,
      },
      { upsert: true, new: true }
    );
    if (!user) {
      throw Error("Couldnt update password");
    }
    else
      return user;
  } catch (e) {
    console.log("From user.services.passwordUpdate: ", e);
    throw Error(e);
  }
};

// Create admin user
exports.createAdminUser = async (query) => {
  try {
    var digest = crypto
      .createHash("sha256", process.env.HASH_SALT)
      .update(query.password)
      .digest("hex");
    const user = await User.findOneAndUpdate(
      { email: query.email },
      {
        email: query.email,
        name: query.name,
        department: query.department||"admin",
        password: digest,
        role: query.role||"admin",
      },
      { upsert: true, new: true }
    );
    if (!user) {
      throw Error("Couldnt create user");
    }
    return user;
  } catch (e) {
    console.log("From user.services.createAdminUser: ", e);
    throw Error(e);
  }
};