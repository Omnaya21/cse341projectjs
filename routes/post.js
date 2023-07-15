const express = require('express');
const {requiresAuth} = require('express-openid-connect'); 

const postController = require('../controllers/post');
//const { userValidationRules, validateCollection, idValidationRules } = require('../validation');

const router = express.Router();



//router.get('/', requiresAuth(), postController.getAllUsers);
//router.get('/:id', requiresAuth(), idValidationRules(), validateCollection, postController.getUser);
//router.post('/', requiresAuth(), userValidationRules(), validateCollection, postController.newUser);
//router.put('/:id', requiresAuth(), idValidationRules(), userValidationRules(), validateCollection, postController.editUser);
//router.delete('/:id', requiresAuth(), idValidationRules(), validateCollection, postController.deleteUser);

module.exports = router;