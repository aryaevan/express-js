import { Router, Request, Response } from "express";
import { Database } from "sqlite3";

const router = Router();

const diseaseRouter = (db: Database) => {
    // Create
    router.post('/', (req: Request, res: Response) => {
        const { name, picture, patient_name, patient_age } = req.body;
        const sql = 'INSERT INTO disease (name, picture, patient_name, patient_age) VALUES (?, ?, ?, ?)';
        db.run(sql, [name, picture, patient_name, patient_age], function (err) {
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
        db.all('SELECT * FROM disease', (err, data) => {
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
        db.get('SELECT * FROM disease WHERE id = ?', [id], (err, data) => {
            if (err) {
                console.error('Error fetching data from database:', err);
                res.status(500).json({ error: 'Error fetching data from database' });
            } else {
                if (!data) {
                    res.status(404).json({ error: 'Disease not found' });
                } else {
                    res.json(data);
                }
            }
        });
    });

    // Update
    router.put('/:id', (req: Request, res: Response) => {
        const id = req.params.id;
        const { name, picture, patient_name, patient_age } = req.body;
        const sql = 'UPDATE disease SET name = ?, picture = ?, patient_name = ?, patient_age = ? WHERE id = ?';
        db.run(sql, [name, picture, patient_name, patient_age, id], function (err) {
            if (err) {
                console.error('Error updating data in database:', err);
                res.status(500).json({ error: 'Error updating data in database' });
            } else {
                res.json({ message: 'Disease updated successfully' });
            }
        });
    });

    // Delete
    router.delete('/:id', (req: Request, res: Response) => {
        const id = req.params.id;
        db.run('DELETE FROM disease WHERE id = ?', [id], function (err) {
            if (err) {
                console.error('Error deleting data from database:', err);
                res.status(500).json({ error: 'Error deleting data from database' });
            } else {
                res.json({ message: 'Disease deleted successfully' });
            }
        });
    });

    return router;
}

export default diseaseRouter;
