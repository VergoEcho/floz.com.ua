const {Router} = require('express')
const passport = require('passport')
const {login, createUser, user} = require('../controllers/auth.controller')
const router = Router()

// /api/auth/admin/login
router.post('/login', login)
// /api/auth/admin/create
router.post(
    '/admin/create',
    passport.authenticate('jwt', {session: false}),
    createUser
    )

    router.post(
        '/register',
        createUser
        )
    // router.get(
    //     '/getUser',
    //     passport.authenticate('jwt', {session: false}),
    //     user
    // )

module.exports = router