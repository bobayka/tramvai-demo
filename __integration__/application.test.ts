import type { StartCliResult } from '@tramvai/test-integration';
import { startCli } from '@tramvai/test-integration';

describe('tramvai-sandbox', () => {
  let app: StartCliResult;

  beforeAll(async () => {
    app = await startCli('tramvai-sandbox');
  }, 80000);

  afterAll(() => {
    return app.close();
  });

  it('request to main page return status 200', async () => {
    return app.request('/').expect(200);
  });
});
