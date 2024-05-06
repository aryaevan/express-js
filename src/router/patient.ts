import { Router, Request, Response } from "express";
import { Database } from "sqlite3";

const router = Router();

const patientRouter = (db: Database) => {
    // Create
    router.post('/', (req: Request, res: Response) => {
        const { name, age } = req.body;
        const sql = 'INSERT INTO patient (name, age) VALUES (?, ?)';
        db.run(sql, [name, age], function (err) {
            if (err) {
                console.error('Error inserting data into database:', err);
                res.status(500).json({ error: 'Error inserting data into database' });
            } else {
                res.json({ id: this.lastID });
            }
        });
    });

    // Read all
    router.get('/', (req: Request, res: Response) => {
        db.all('SELECT * FROM patient', (err, data) => {
            if (err) {
                console.error('Error fetching data from database:', err);
                res.status(500).json({ error: 'Error fetching data from database' });
            } else {
                res.json(data);
            }
        });
    });

    // Read one
    router.get('/:id', (req: Request, res: Response) => {
        const id = req.params.id;
        db.get('SELECT * FROM patient WHERE id = ?', [id], (err, data) => {
            if (err) {
                console.error('Error fetching data from database:', err);
                res.status(500).json({ error: 'Error fetching data from database' });
            } else {
                if (!data) {
                    res.status(404).json({ error: 'Patient not found' });
                } else {
                    res.json(data);
                }
            }
        });
    });

    // Update
    router.put('/:id', (req: Request, res: Response) => {
        const id = req.params.id;
        const { name, age } = req.body;
        const sql = 'UPDATE patient SET name = ?, age = ? WHERE id = ?';
        db.run(sql, [name, age, id], function (err) {
            if (err) {
                console.error('Error updating data in database:', err);
                res.status(500).json({ error: 'Error updating data in database' });
            } else {
                res.json({ message: 'Patient updated successfully' });
            }
        });
    });

    // Delete
    router.delete('/:id', (req: Request, res: Response) => {
        const id = req.params.id;
        db.run('DELETE FROM patient WHERE id = ?', [id], function (err) {
            if (err) {
                console.error('Error deleting data from database:', err);
                res.status(500).json({ error: 'Error deleting data from database' });
            } else {
                res.json({ message: 'Patient deleted successfully' });
            }
        });
    });

    return router;
}

export default patientRouter;
