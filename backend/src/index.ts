import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
//importing routes
import userRoutes from "./routes/userRoutes"
//using routes
app.use("api/v1/",userRoutes)

app.listen(port, () => {
  console.log(`server is runing at ${port}`);
});
