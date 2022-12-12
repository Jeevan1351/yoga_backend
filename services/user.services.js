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
      name: user.name,
    };
    //Generating JWT token for the extracted user
    semiUser.token = generateToken(semiUser);
    return semiUser;
  } catch (e) {
    console.log("From user.services.getUser: ", e);
    throw e;
  }
};

// Create new user
exports.createUser = async (query) => {
  try {
    var digest = crypto
      .createHash("sha256", process.env.HASH_SALT)
      .update(query.password)
      .digest("hex");
    const user = new User({ email: query.email, password: digest, name: query.name, role: "user" });
    await user.save();
    if (!user) {
      throw Error("Couldnt create user");
    }
    else
      return user;
  } catch (e) {
    console.log("From user.services.createUser: ", e);
    throw Error(e);
  }
};

// Updating user password
exports.updatePassword = async (query) => {
  try {
    // Creating digest of the current password
    var digest = crypto
      .createHash("sha256", process.env.HASH_SALT)
      .update(query.password)
      .digest("hex");
    
    const user = await User.findOne({ email: query.email });
    if (!user) {
      throw Error("User not found");
    }
    // Checking current credentials
    if (user.password !== digest) {
      throw Error("Incorrect password");
    }

    // Creating digest of the new password
    var newDigest = crypto
      .createHash("sha256", process.env.HASH_SALT)
      .update(query.newPassword)
      .digest("hex");
    

    // Checking if new password is same as old password
    if (digest === newDigest) {
      throw Error("New password cannot be same as old password");
    }

    // Updating password
    const newUser = await User.findOneAndUpdate(
      { email: query.email },
      {
        email: query.email,
        password: newDigest,
      },
      { new: true }
    );
    if (!newUser) {
      throw Error("Couldnt update password");
    }
    else
      return newUser;
  } catch (e) {
    console.log("From user.services.passwordUpdate: ", e);
    throw Error(e);
  }
};

// Delete user
exports.deleteUser = async (query) => {
  try {
    const user = await User.remove({ email: query.email});
    if (!user) {
      throw Error("Couldnt delete user");
    }
    else
      return user;
  } catch (e) {
    console.log("From user.services.deleteUser: ", e);
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
    const user = new User(
      {
        email: query.email,
        name: query.name,
        role: "admin",
        password: digest
      }
    );
    await user.save();
    if (!user) {
      throw Error("Couldnt create user");
    }
    return user;
  } catch (e) {
    if( e.code === 11000)
      throw Error("User already exists");
    console.log("From user.services.createAdminUser: ", e);
    throw Error(e);
  }
};