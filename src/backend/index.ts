import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import db from './db';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const saltRounds = 10;

// Email transporter for sending verification emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

interface RegisterRequest extends Request {
  body: {
    first_name: string;
    last_name: string;
    age: number;
    gender: string;
    email: string;
    password?: string;
  };
}

// Register user (with or without password)
app.post('/register', (req: RegisterRequest, res: Response) => {
  const { first_name, last_name, age, gender, email, password } = req.body;

  if (password) {
    // Register with password
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      if (row) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

        db.run(
          `INSERT INTO users (first_name, last_name, age, gender, email, password) VALUES (?, ?, ?, ?, ?, ?)`,
          [first_name, last_name, age, gender, email, hashedPassword],
          (err) => {
            if (err) {
              return res.status(500).json({ message: 'Registration failed' });
            }
            res.status(200).json({ message: 'User registered successfully' });
          }
        );
      });
    });
  } else {
    // Register without password (requires email verification)
    const verificationToken = crypto.randomBytes(16).toString('hex');
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      if (row) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      db.run(
        `INSERT INTO users (first_name, last_name, age, gender, email, verification_token) VALUES (?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, age, gender, email, verificationToken],
        (err) => {
          if (err) {
            return res.status(500).json({ message: 'Registration failed' });
          }

          const verificationUrl = `http://localhost:3000/verify?token=${verificationToken}`;
          const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the following link: ${verificationUrl}`,
          };

          transporter.sendMail(mailOptions, (err) => {
            if (err) {
              return res.status(500).json({ message: 'Error sending verification email' });
            }
            res.status(200).json({ message: 'Verification email sent' });
          });
        }
      );
    });
  }
});

// Start server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
