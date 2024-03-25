const {Router} = require('express')
const authRouter = require('./auth')
const searchRouter = require('./search');
const router = new Router()

router.use("/auth", authRouter)
router.use("/search", searchRouter);
module.exports = router