const request = require('supertest');
const app = require('../index.js');
const User = require('../models/user.model.js');

console.log("DEBUG User is:", User);
describe('Auth', () => {

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('register -> login flow', async () => {
    const reg = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test', email: 't@t.com', password: 'pass123' });

    expect(reg.status).toBe(200);
    expect(reg.body.token).toBeDefined();
  });
});
