import express from 'express'
import { getUserById, getUserResumes, loginUser, registerUser } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

//protected routes
userRouter.get('/data', protect, getUserById)
userRouter.get('/resumes', protect, getUserResumes)

export default userRouter;