"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pact_1 = require("@pact-foundation/pact");
const path_1 = __importDefault(require("path"));
const client_1 = require("../src/client");
describe('Service B Client', () => {
    const provider = new pact_1.Pact({
        consumer: 'service-a',
        provider: 'service-b',
        log: path_1.default.resolve(process.cwd(), 'logs', 'pact.log'),
        logLevel: 'warn',
        dir: path_1.default.resolve(process.cwd(), 'pacts'),
        spec: 2
    });
    var expectedUser = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com'
    };
    var expectedUsers = [
        expectedUser,
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com'
        }
    ];
    let client;
    beforeAll(() => provider.setup());
    afterAll(() => provider.finalize());
    describe('getUsers', () => {
        beforeEach(() => {
            return provider.addInteraction({
                state: 'users exist',
                uponReceiving: 'a request for all users',
                withRequest: {
                    method: 'GET',
                    path: '/users'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: expectedUsers
                }
            });
        });
        it('returns all users', async () => {
            client = new client_1.ServiceBClient(provider.mockService.baseUrl);
            const users = await client.getUsers();
            expect(users).toEqual(expectedUsers);
        });
        afterEach(() => provider.verify());
    });
    describe('getUserById', () => {
        beforeEach(() => {
            return provider.addInteraction({
                state: 'user with ID 1 exists',
                uponReceiving: 'a request for user with ID 1',
                withRequest: {
                    method: 'GET',
                    path: '/users/1'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: expectedUser
                }
            });
        });
        it('returns the user', async () => {
            client = new client_1.ServiceBClient(provider.mockService.baseUrl);
            const user = await client.getUserById(1);
            expect(user).toEqual(expectedUser);
        });
        afterEach(() => provider.verify());
    });
});
