const router = require('express').Router();
const { getFood, getFoodById, addFood, deleteFood } = require('../../controllers/food-controller');

// import middleware
const { verifyToken } = require('../../utils/auth');

router.get('/', [verifyToken], getFood);
router.post('/', [verifyToken], addFood);
router.delete('/:foodId', [verifyToken], deleteFood);

module.exports = router;
