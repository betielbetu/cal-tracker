const router = require('express').Router();
const userRoutes = require('./user-routes');
const foodRoutes = require('./food-routes');

router.use('/users', userRoutes);
router.use('/food', foodRoutes);

module.exports = router;
