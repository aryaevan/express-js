import express from 'express'
import path from 'path'
// TODO change database?
import { Database } from "sqlite3"

import diseaseRouter from './router/disease'

const app = express();
const db = new Database('database.db')

app.use(express.json())
app.use(express.static('public'))


//split router to different files
app.use('/disease',diseaseRouter(db))

// TODO how do you debug typescript code?
app.listen(9000, () => {
    console.log('App is running')
})

/* Homepage load from html */
app.get('/', (_, res) => {
    // console.log("this location",__dirname)
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

// TODO split to separate module
// TODO what's the bug in this method and how to fix it?
app.get('/init', (req, res) => {
    // TODO normalize database
    db.run(`CREATE TABLE disease(
        name            text,
        picture         text,
        patient_name    text,
        patient_age     int
    )`)

    db.all(`SELECT * FROM disease`, (err: any, data: any) => {
        res.send(data)
    })
    // TODO sample database join?
})

// TODO create CRUD sample
app.get('/diseases', (req, res) => {
    db.all(`SELECT * FROM disease`, (err: any, data: any) => {
        res.send(data)
    })
})
// TODO create dockerfile
// TODO create docker-compose file
// TODO set CI/CD for the repository
// TODO create unit test