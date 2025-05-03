import { Verifier } from '@pact-foundation/pact';
import { createApp } from '../src/app';
import express from 'express';
import path from 'path';

describe('Service B Provider Verification', () => {
  let app: express.Application;
  let server: any;

  beforeAll((done) => {
    app = createApp();
    server = app.listen(3002, () => {
      console.log('Provider service listening on http://localhost:3002');
      done();
    });
  });

  afterAll((done) => {
    server.close(() => {
      console.log('Provider service stopped');
      done();
    });
  });

  it('validates the expectations of Service A', async () => {
    const options = {
      provider: 'service-b',
      providerBaseUrl: 'http://localhost:3002',
      pactBrokerUrl: 'http://localhost:9292',
      consumerVersionSelectors: [
        { latest: true }
      ],
      publishVerificationResult: true,
      providerVersion: '1.0.0',
      stateHandlers: {
        'users exist': () => {
          console.log('Setting up state: users exist');
          return Promise.resolve();
        },
        'user with ID 1 exists': () => {
          console.log('Setting up state: user with ID 1 exists');
          return Promise.resolve();
        }
      }
    };

    return new Verifier(options).verifyProvider();
  }, 60000); // Increase timeout for the verification process
});
