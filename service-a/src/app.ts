import express from 'express';
import { ServiceBClient, User } from './client';

export function createApp(serviceBUrl: string) {
  const app = express();
  const serviceBClient = new ServiceBClient(serviceBUrl);

  app.use(express.json());

  app.get('/api/users', async (req: any, res: { json: (arg0: { count: number; users: User[]; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
    try {
      const users = await serviceBClient.getUsers();
      res.json({
        count: users.length,
        users
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  app.get('/api/users/:id', async (req: { params: { id: string; }; }, res: { json: (arg0: { user: User; enriched: boolean; timestamp: string; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await serviceBClient.getUserById(id);
      res.json({
        user,
        enriched: true,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error(`Error fetching user ${req.params.id}:`, error);
      res.status(500).json({ error: `Failed to fetch user ${req.params.id}` });
    }
  });

  return app;
}