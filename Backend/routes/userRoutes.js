import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getUserData, storeRecentSearchedCities } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.get("/get" , protect,  getUserData)
userRouter.post("/storecities" , protect,  storeRecentSearchedCities)

export default userRouter