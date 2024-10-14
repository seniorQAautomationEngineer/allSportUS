import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import db from './db'; // Import SQLite database connection

const router = Router();

// Registration route
router.post(
  '/api/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').not().isEmpty(),
    body('lastName').not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      // Check if the user already exists
      db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (user) {
          return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        db.run(
          `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`,
          [firstName, lastName, email, hashedPassword],
          function (err) {
            if (err) {
              return res.status(500).json({ msg: 'Error saving user to database' });
            }

            // Create JWT token
            const payload = { user: { id: this.lastID } }; // `this.lastID` gets the ID of the newly created user
            const token = jwt.sign(payload, 'yourJWTSecret', { expiresIn: '1h' });

            res.json({ token });
          }
        );
      });
    } catch (err) {
      const error = err as Error;  // Cast err to Error type
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

export default router;
