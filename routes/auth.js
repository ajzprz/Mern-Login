const { Router } = require('express');
const {returnSignupPage, returnLoginPage, createUser, loginUser, logOutUser} = require('../controllers/authController')
const router = Router();

router.get('/signup', returnSignupPage)
router.post('/signup', createUser)
router.get('/login', returnLoginPage)
router.post('/login', loginUser)
router.get('/signout', logOutUser )

module.exports = router