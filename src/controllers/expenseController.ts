import { Request, Response } from 'express';
import { db } from '../app';
import { Expense } from '../models/expense';
import { OkPacket } from 'mysql2';


// Get all expenses
export const getExpenses = (req: Request, res: Response) => {
  const sql = 'SELECT * FROM expenses';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch expenses' });
    }
    res.json(results);
  });
};

// Add a new expense
export const addExpense = (req: Request, res: Response) => {
    const { amount, description, category_id, date } = req.body as Expense;
    const sql = 'INSERT INTO expenses (amount, description, category_id, date) VALUES (?, ?, ?, ?)';
    db.query<OkPacket>(sql, [amount, description, category_id, date], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to add expense' });
      }
      res.json({ message: 'Expense added successfully', id: result.insertId });
    });
  };
  

// Update an expense
export const updateExpense = (req: Request, res: Response) => {
  const { expense_id } = req.params;
  const { amount, description } = req.body as Expense;
  const sql = 'UPDATE expenses SET amount = ?, description = ? WHERE id = ?';
  db.query(sql, [amount, description, expense_id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update expense' });
    }
    res.json({ message: 'Expense updated successfully' });
  });
};

// Delete an expense
export const deleteExpense = (req: Request, res: Response) => {
  const { expense_id } = req.params;
  const sql = 'DELETE FROM expenses WHERE id = ?';
  db.query(sql, [expense_id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete expense' });
    }
    res.json({ message: 'Expense deleted successfully' });
  });
};
