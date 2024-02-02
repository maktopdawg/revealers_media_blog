import express , { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3900;

app.get('/', (req: Request, res: Response) => {
  res.status(201).send(
    { name: "Revealers Media" }
  );
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});