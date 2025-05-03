const { Publisher } = require('@pact-foundation/pact-node');
const path = require('path');

const publisher = new Publisher({
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: 'http://localhost:9292',
  consumerVersion: "1.0.0",
  tags: ['dev']
});

publisher.publish()
  .then(() => {
    console.log('Pacts successfully published!');
  })
  .catch(error => {
    console.error('Error publishing pacts:', error);
    process.exit(1);
  });
