import express from 'express';

export interface User {
  id: number;
  name: string;
  email: string;
}

// Simulate a database with some users
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];

export function createApp() {
  const app = express();
  
  app.use(express.json());

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: `User with ID ${id} not found` });
    }
  });

  return app;
}
