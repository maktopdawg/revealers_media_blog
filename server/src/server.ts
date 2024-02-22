import express , { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/conn';
import mongoose from 'mongoose';
import routes from './routes/index'
import logger from './middleware/logEvents';

dotenv.config();

connectDB();

const app: Express = express();
const PORT = process.env.PORT || 3900;

app.use(logger)

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.status(201).send(
    { name: "Revealers Media" }
  );
});

app.use(routes);


mongoose.connection.once('open', () => {
  console.log(`⚡️[server]: Connection To Database Successful`);
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
})
