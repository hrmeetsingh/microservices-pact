import { createApp } from './app';

const PORT = process.env.PORT || 3000;
const PROVIDER_URL = process.env.PROVIDER_URL || 'http://localhost:3001';

const app = createApp(PROVIDER_URL);

app.listen(PORT, () => {
  console.log(`Consumer listening on port ${PORT}`);
  console.log(`Connected to Provider at ${PROVIDER_URL}`);
});