import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./configs/db.js";
import userRouter from "./routes/user.route.js";
import resumeRouter from "./routes/resume.route.js";
import aiRouter from "./routes/ai.route.js";

const app = express();



// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Hello from AI Resume Builder Backend");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// ✅ Connect to DB (once per cold start)
let isConnected = false;
const connectOnce = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};
connectOnce();

// ✅ Export app for Vercel (no app.listen)
export default app;

// ✅ Optional local development server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
}
