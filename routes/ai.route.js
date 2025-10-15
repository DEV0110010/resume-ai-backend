import express from 'express';
import { protect } from '../middlewares/auth.middleware.js'
import { enhanceJobDescription, enhanceProSummary, uploadResume } from '../controllers/ai.controller.js';


const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum',protect, enhanceProSummary);
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription);
aiRouter.post('/upload-resume', protect, uploadResume);


export default aiRouter;