import { Router } from 'express';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../controllers/expenseController';

const router = Router();

// CRUD Routes
router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/:expense_id', updateExpense);
router.delete('/:expense_id', deleteExpense);

export default router;
