import { Router, Request, Response } from "express";
import { Database } from "sqlite3";

const router = Router();

const databaseRouter = (db: Database) => {
    router.get('/', (req, res) => {
        try{
            db.run(`CREATE TABLE disease(
                name            text,
                picture         text,
                patient_name    text,
                patient_age     int
            )`)
        
            db.all(`SELECT * FROM disease`, (err: any, data: any) => {
                res.send(data)
            })

            console.log("init completed")
        } catch(e) {
            console.error("database init failed", e)
        }
    })
    
    return router;
};

export default databaseRouter