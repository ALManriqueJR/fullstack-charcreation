import express from 'express';
import cors from 'cors';

import { addChar } from './control/char.js';


const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["X-PINGOTHER", "Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//endpoints
app.options('*', cors());
app.post('/char/save', addChar);

//test
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}...`);
});

app.get('/ping', (req, res, nxt) => {
    res.send({ message: "pong" });
});


app.use((req, res, next) => {
    console.log(`Recebendo ${req.method} em ${req.url}`);
    next();
});