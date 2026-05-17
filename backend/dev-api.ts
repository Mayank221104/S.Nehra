import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./src/server/routes/auth.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_, res) => {
  res.json({
    ok: true,
    message: "Backend running",
  });
});

app.use("/api/auth", authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
