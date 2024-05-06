import { Router} from "express";
import { Database } from "sqlite3";

const router = Router();

const databaseRouter = (db: Database) => {
    router.get('/', (req, res) => {
        try{
            db.run(`CREATE TABLE IF NOT EXISTS disease(
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                name            TEXT,
                picture         TEXT,
                patient_id       INTEGER,
                FOREIGN KEY (patient_id) REFERENCES patient(id)
            )`)

            db.run(`CREATE TABLE IF NOT EXISTS patient(
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                name            TEXT,
                age             INTEGER
            )`);

            // db.run(`CREATE TABLE IF NOT EXISTS incoming_medicine(
            //     id              INTEGER PRIMARY KEY AUTOINCREMENT,
            //     id_medicine     INTEGER,
            //     batch_no        TEXT,
            //     exp_date        DATE,
            //     quantity        INTEGER,
            //     date            DATE,
            //     id_unit         INTEGER,
            //     unit_name       TEXT,
            //     FOREIGN KEY (id_medicine) REFERENCES medicine(id),
            //     FOREIGN KEY (id_unit) REFERENCES unit(id)
            // )`);

            // db.run(`CREATE TABLE IF NOT EXISTS outgoing_medicine(
            //     id              INTEGER PRIMARY KEY AUTOINCREMENT,
            //     id_medicine     INTEGER,
            //     batch_no        TEXT,
            //     exp_date        DATE,
            //     quantity        INTEGER,
            //     date            DATE,
            //     id_unit         INTEGER,
            //     unit_name       TEXT,
            //     FOREIGN KEY (id_medicine) REFERENCES medicine(id),
            //     FOREIGN KEY (id_unit) REFERENCES unit(id)
            // )`);

        
            // db.all(`SELECT * FROM disease`, (err: any, data: any) => {
            //     res.send(data)
            // })

            db.all(`SELECT disease.*, patient.name AS patient_name, patient.age AS patient_age
                    FROM disease
                    LEFT JOIN patient
                    ON disease.patient_id = patient.id`, (err: any, data: any) => {
                res.send(data);
            });

            console.log("init completed")
        } catch(e) {
            console.error("database init failed", e)
        }
    })
    
    return router;
};

export default databaseRouter