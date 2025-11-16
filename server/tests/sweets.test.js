const request = require('supertest');
const app = require('../index.js');
const User = require('../models/user.model.js');
const Sweet = require('../models/sweet.model.js');


console.log("DEBUG User is:", User);

describe('Sweets', () => {
  let token;  // <--- FIX: normal variable, not "this"

  beforeEach(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});

    await User.create({
      name: 'Admin',
      email: 'admin@t.com',
      password: 'adminpass',
      role: 'admin'
    });

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@t.com', password: 'adminpass' });

    token = login.body.token; // <--- FIX
  });

  test('add sweet and purchase', async () => {
    const add = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)   // <--- FIX
      .send({ name: 'Gulab', category: 'Classic', price: 20, quantity: 5 });

    expect(add.status).toBe(201);

    const id = add.body._id;

    const pur = await request(app)
      .post(`/api/sweets/${id}/purchase`)
      .set('Authorization', `Bearer ${token}`)  
      .send({ amount: 2 });

    expect(pur.status).toBe(200);
    expect(pur.body.sweet.quantity).toBe(3);
  });
});
