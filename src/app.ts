import express, { Request, Response, NextFunction } from "express";
import todoRoutes from "./routes/TodoRoutes";
import { json } from "body-parser";

const app = express();
app.use(json());
app.use("/todo", todoRoutes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error)
    res.status(500).json({ message: `something went wrong ${error.message}` });
});

app.listen(3000);
