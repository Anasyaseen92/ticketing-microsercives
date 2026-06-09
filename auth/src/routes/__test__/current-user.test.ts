import request from "supertest";
import { app } from "../../app";

it('responds with details about the current user', async () => {


  const cookie = await global.signin(); // ← extract cookie

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)                           // ← attach cookie
    .send({})
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com'); // ← fix body path too
});

it('responds with null if not authenticated', async () => {
    const response = await request(app)
      .get('/api/users/currentuser')
      .send({})
      .expect(200);

    expect(response.body.currentUser).toBeNull();
});