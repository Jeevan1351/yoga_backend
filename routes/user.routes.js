const userController = require('../controllers/user.controller');
const middleLogger = require('../helpers/middleLogger');
const authenticateToken = require('../helpers/authenticateToken');

module.exports = (app) => {

    // Login a user
    app.post('/users/login', middleLogger, userController.loginUser);
    
    // Update password
    app.post('/users/update-password', middleLogger, userController.updatePassword);
    
    //Create admin user
    app.post('/users/create-admin', authenticateToken("admin"), middleLogger, userController.createAdminUser);
}