import express from 'express'
import path from 'path'
import { Database } from "sqlite3"
import diseaseRouter from './router/disease'
import databaseRouter from './router/database';

const app = express();
const db = new Database('database.db');

app.use(express.json());
app.use(express.static('public'));


// split router to different files
app.use('/disease',diseaseRouter(db));
app.use('/init', databaseRouter(db));

// homepage load from html
app.get('/', (_, res) => {
    res.redirect('/index.html');
});

// app initialization
app.listen(9000, () => {
    console.log('App is running');
})


