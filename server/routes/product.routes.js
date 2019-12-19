const passport = require('passport')
const {Router} = require('express')
const upload = require('../middleware/upload')
const ctr = require('../controllers/product.controller')
const router = Router()
// Admin
// /api/product/admin
router.post(
    '/admin/',
    passport.authenticate('jwt', {session: false}),
    // (req) => {
    //     if(req.user.login == "admin"){
    //         req.next();
    //     }else{
    //         res.status(403).json({message: 'Forrbiden'});
    //     }
    // },
    upload.single('image'),
    ctr.create
)

router.get(
    '/admin/',
    passport.authenticate('jwt', {session: false}),
    ctr.getAll
)

router.get(
    '/admin/:id',
    passport.authenticate('jwt', {session: false}),
    ctr.getById
)

router.put(
    '/admin/:id',
    passport.authenticate('jwt', {session: false}),
    ctr.update
)

router.delete(
    '/admin/:id',
    passport.authenticate('jwt', {session: false}),
    ctr.remove
)

// Base
// /api/product
router.get('/', ctr.getAll)
router.get('/:id', ctr.getById)


module.exports = router
