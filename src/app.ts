import express, { Application } from 'express';
import mysql from 'mysql2';
import expenseRoutes from './routes/expenseRoutes';

// Create an instance of the Express application
const app: Application = express();

// Middleware
app.use(express.json());

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
app.use('/api/expenses', expenseRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { db };
