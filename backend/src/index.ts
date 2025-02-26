import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
//importing routes
import userRoutes from "./routes/userRoutes"
import contentRoutes from "./routes/contentRoutes"
//using routes
app.use("api/v1/user",userRoutes)
app.use("api/v1/content",contentRoutes)


app.listen(port, () => {
  console.log(`server is runing at ${port}`);
});
