import { Pact } from '@pact-foundation/pact';
import path from 'path';
import { ProviderClient, User } from '../src/client';

describe('Provider Client', () => {
  const provider = new Pact({
    consumer: 'consumer',
    provider: 'provider',
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    logLevel: 'warn',
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 4
  });

  var expectedUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  var expectedUsers: User[] = [
    expectedUser,
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com'
    }
  ];

  let client: ProviderClient;

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
          body: expectedUsers as any
        }
      });
    });

    it('returns all users', async () => {
      client = new ProviderClient(provider.mockService.baseUrl);
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
          body: expectedUser as any
        }
      });
    });

    it('returns the user', async () => {
      client = new ProviderClient(provider.mockService.baseUrl);
      const user = await client.getUserById(1);
      expect(user).toEqual(expectedUser);
    });

    afterEach(() => provider.verify());
  });
});