import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlware/globalErrorHandler";
import notFound from "./app/middlware/notFound";
import router from "./app/routes";

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

//Testing
app.get("/", (req, res) => {
  res.send("Hello From this project");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;