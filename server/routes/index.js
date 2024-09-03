const express = require('express');
const router = express.Router();

const bookRouter = require('./bookRouter');
const userRouter = require('./userRouter');
const authorRouter = require('./authorRouter');
const categoryRouter = require('./categoryRouter');

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/author', authorRouter);
router.use('/book', bookRouter);

module.exports = router;
