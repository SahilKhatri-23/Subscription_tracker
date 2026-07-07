import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleawre from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json()); // allows app to handle JSON data in request body or API calls

app.use(express.urlencoded({ extended: false })); // allows app to handle form data via HTML forms  in request body or API calls

app.use(cookieParser()); // allows app to handle cookies in request body or API calls
app.use(arcjetMiddleawre)

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  connectToDatabase();
});

export default app;
