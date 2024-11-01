import cors from "cors";
import express from "express";
import router from "./routes";

const app = express();

app.use(express.json());

app.use(cors());
app.use(router)
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).send({ error: err.message });
  }
);

export default app;
