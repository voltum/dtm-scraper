import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getScore } from './Crawler';
const cors = require("cors");

dotenv.config();

const app: Express = express();

app.use(cors({ origin: process.env.REMOTE_CLIENT_APP }));

const port = process.env.PORT || 8080;

app.get('/', async (req: Request, res: Response) => {
  let answer: { status: string, score?: number | undefined } = {
    status: 'success'
  };

  try {
    const url = new URL(req.query.queryURL as string);
    
    if(url.hostname !== 'mandat.dtm.uz') throw "Host name forbidden";

    const score = await getScore(req.query.queryURL as string);

    score ? answer.score = score : answer.status = 'failed';

    res.send(answer);

  } catch(error) {
    res.status(403).send();
    res.end();
    return;
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});