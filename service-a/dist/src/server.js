"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
const SERVICE_B_URL = process.env.SERVICE_B_URL || 'http://localhost:3001';
const app = (0, app_1.createApp)(SERVICE_B_URL);
app.listen(PORT, () => {
    console.log(`Service A listening on port ${PORT}`);
    console.log(`Connected to Service B at ${SERVICE_B_URL}`);
});
