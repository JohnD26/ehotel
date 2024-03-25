const {Router} = require('express')
const authRouter = require('./auth')
const hotelRouter = require('./hotel');
const router = new Router()

router.use("/auth", authRouter)
router.use("/hotel", hotelRouter);
module.exports = router