"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const client_1 = require("./client");
function createApp(serviceBUrl) {
    const app = (0, express_1.default)();
    const serviceBClient = new client_1.ServiceBClient(serviceBUrl);
    app.use(express_1.default.json());
    app.get('/api/users', async (req, res) => {
        try {
            const users = await serviceBClient.getUsers();
            res.json({
                count: users.length,
                users
            });
        }
        catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    });
    app.get('/api/users/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await serviceBClient.getUserById(id);
            res.json({
                user,
                enriched: true,
                timestamp: new Date().toISOString()
            });
        }
        catch (error) {
            console.error(`Error fetching user ${req.params.id}:`, error);
            res.status(500).json({ error: `Failed to fetch user ${req.params.id}` });
        }
    });
    return app;
}
