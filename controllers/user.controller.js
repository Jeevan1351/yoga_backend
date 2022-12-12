const UserServices = require("../services/user.services");

// Verify credentials of existing user and provide token
exports.loginUser = async (req, res) => {
  try {
    var user = await UserServices.getUser(req.body);
    if (user !== null) {
      return res.status(201).json({
        status: 201,
        data: user,
        message: "User logged in successfully",
      });
    } else {
      return res.status(403).json({
        status: 403,
        message: "Invalid Credentials",
      });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const data = await UserServices.createUser(req.body);
    if (data !== null) {
      return res.status(200).json({
        status: 200,
        data: data,
        message: "User created successfully",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "User not created",
      });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};


// Update the password of existing user
exports.updatePassword = async (req, res) => {
  try {
    const data = await UserServices.updatePassword(req.body);
    if (data !== null) {
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Password updated successfully",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Password not updated",
      });
    }
  }
  catch (e) {
    console.log(e)
    return res.status(400).json({ status: 400, message: e.message });
  }
}

// Create new admin user
exports.createAdminUser = async (req, res) => {
  try {
    const data = await UserServices.createAdminUser(req.body);
    if (data !== null) {
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Admin user created successfully",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Admin user not created",
      });
    }
  }
  catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}