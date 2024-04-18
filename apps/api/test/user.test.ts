import supertest from 'supertest'
import { UserTestHelper } from './test.util'
import App from '@/app'

describe('POST /users/register', () => {
  
  afterAll(async () => {
    await UserTestHelper.delete();
  })
  
  it('should reject register new user if request is invalid', async () => {
    const app = new App();
    const response = await supertest(app.app)
        .post('/users/register')
        .send({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          roleId: ""
        });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBeDefined();
  })

  it('should register user correctly', async () => {
    const app = new App();
    const request = {
      firstName: "test",
      lastName: "test",
      email: "test@gmail.com",
      password: "test",
      roleId: "1"
    }
    const response = await supertest(app.app)
        .post('/users/register')
        .send(request);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.id.length).not.toBe(0);
    expect(response.body.data.firstName).toBe(request.firstName);
    expect(response.body.data.lastName).toBe(request.lastName);
    expect(response.body.data.email).toBe(request.email);
  })

  it('should reject register new user if email already exists', async () => {
    const app = new App();
    const request = {
      firstName: "test",
      lastName: "test",
      email: "test@gmail.com",
      password: "test",
      roleId: "2"
    }
    const response = await supertest(app.app)
        .post('/users/register')
        .send(request);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('Email already exists!');
  })

})
