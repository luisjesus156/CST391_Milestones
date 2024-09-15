import { Request, Response } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2'; // Importing these types from mysql2
import { db } from '../app'; // Assuming db is exported from app

// GET all products
export const getProducts = (req: Request, res: Response) => {
  db.query('SELECT * FROM products', (err, results: RowDataPacket[]) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results); // RowDataPacket[] contains the rows
  });
};

// GET product by id
export const getProductById = (req: Request, res: Response) => {
  const id = req.params.id;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results: RowDataPacket[]) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.json(results[0]); // RowDataPacket[] for SELECT
  });
};

// POST (create) a new product
export const createProduct = (req: Request, res: Response) => {
  const { name, price } = req.body;
  db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], (err, results: ResultSetHeader) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: results.insertId, name, price }); // ResultSetHeader contains insertId for INSERT queries
  });
};

// PUT (update) a product by id
export const updateProduct = (req: Request, res: Response) => {
  const { name, price } = req.body;
  const id = req.params.id;
  db.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Product updated' });
  });
};

// DELETE a product by id
export const deleteProduct = (req: Request, res: Response) => {
  const id = req.params.id;
  db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Product deleted' });
  });
};
