const userController = require('../controllers/user.controller');
const middleLogger = require('../helpers/middleLogger');
const authenticateToken = require('../helpers/authenticateToken');

module.exports = (app) => {

    // Login a user
    app.post('/users/login', middleLogger, userController.loginUser);

    // Get user
    app.post('/users/get', middleLogger, userController.getUser);

    // Create a new user
    app.post("/users/create", middleLogger, userController.createUser);
    
    // Update password
    app.post('/users/update-password', middleLogger, userController.updatePassword);

    // Delete user
    app.post('/users/delete', middleLogger, userController.deleteUser);
    
    //Create admin user
    app.post('/users/create-admin', authenticateToken("admin"), middleLogger, userController.createAdminUser);
}