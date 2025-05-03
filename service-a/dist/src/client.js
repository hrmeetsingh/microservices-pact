"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBClient = void 0;
const axios_1 = __importDefault(require("axios"));
class ServiceBClient {
    constructor(baseURL) {
        this.client = axios_1.default.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    async getUsers() {
        const response = await this.client.get('/users');
        return response.data;
    }
    async getUserById(id) {
        const response = await this.client.get(`/users/${id}`);
        return response.data;
    }
}
exports.ServiceBClient = ServiceBClient;
