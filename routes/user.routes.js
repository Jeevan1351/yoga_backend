const userController = require('../controllers/user.controller');
// const middleLogger = require('../helpers/middleLogger');
const authenticateToken = require('../helpers/authenticateToken');

module.exports = (app) => {

    // Login a user
    app.post('/users/login', userController.loginUser);

    // Create a new user
    app.post("/users/create", userController.createUser);
    
    // Update password
    app.post('/users/update-password', userController.updatePassword);
    
    //Create admin user
    app.post('/users/create-admin', authenticateToken("admin"), userController.createAdminUser);
}