import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/server/middleware/error.middleware";
import { requestLogger } from "./src/server/middleware/logging.middleware";
import { apiRateLimiter } from "./src/server/middleware/rateLimit.middleware";

import authRoutes from "./src/server/routes/auth.routes";
import userRoutes from "./src/server/routes/user.routes";
import profileRoutes from "./src/server/routes/profile.routes";
import paymentRoutes from "./src/server/routes/payment.routes";
import applicationRoutes from "./src/server/routes/application.routes";
import notificationRoutes from "./src/server/routes/notification.routes";

const app = express();

app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(apiRateLimiter);

app.get("/api/health", (_, res) => res.json({ ok: true, message: "Backend running" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
