import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { errorHandler } from "./src/server/middleware/error.middleware";
import { requestLogger } from "./src/server/middleware/logging.middleware";
import { apiRateLimiter } from "./src/server/middleware/rateLimit.middleware";
import authRoutes from "./src/server/routes/auth.routes";
import userRoutes from "./src/server/routes/user.routes";
import profileRoutes from "./src/server/routes/profile.routes";
import paymentRoutes from "./src/server/routes/payment.routes";
import applicationRoutes from "./src/server/routes/application.routes";
import notificationRoutes from "./src/server/routes/notification.routes";
import resumeRoutes from "./src/server/routes/resume.ts";
import visitorRoutes from "./src/server/routes/visitor.routes";
// ...

const app = express();

// Security
app.use(helmet());
app.use(
  cors({
    origin: [
      "https://s-nehra.vercel.app",
      "https://snehrasolutions.com",
      "https://www.snehrasolutions.com",
      "http://localhost:8080",
      "http://localhost:3000",
    ],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(requestLogger);
app.use("/api/", apiRateLimiter);

// Routes
app.get("/api/health", (_, res) => res.json({ ok: true, message: "Backend running" }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/visitors", visitorRoutes);
// ... other routes

app.use(errorHandler);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
