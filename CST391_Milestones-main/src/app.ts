import express, { Application } from 'express';
import * as mysql from 'mysql2';
//import mysql from 'mysql2';
import expenseRoutes from './routes/expenseRoutes';
import cors from 'cors';

// Create an instance of the Express application
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'chucho11J!', // Your MySQL password
  database: 'expense_tracker' // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Routes
app.use('/api/products', expenseRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { db };
