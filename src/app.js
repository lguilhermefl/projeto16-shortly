import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT);