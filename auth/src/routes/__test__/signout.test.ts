import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
  // signup first to get a cookie
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({});

 
  const cookie = response.get('Set-Cookie')![0];
  expect(cookie).toContain('session=;');  
});