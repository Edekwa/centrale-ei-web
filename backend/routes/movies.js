import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
  res.json({ message: 'Hello from the movies route!' });
});

export default router;
