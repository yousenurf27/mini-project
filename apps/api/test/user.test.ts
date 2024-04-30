import supertest from 'supertest'
import { UserTestHelper } from './utils/userTestHelper'
import App from '@/app'

const app = new App();

describe('POST /users/', () => {
  
  afterAll(async() => {
    await UserTestHelper.delete();
  })
  
  it('should reject register new user if request is invalid', async () => {
    const response = await supertest(app.app)
        .post('/users/')
        .send({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          roleId: ""
        });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('fail');
    expect(typeof response.body.message).toBe('object');
  })

  it('should register user correctly', async () => {
    const request = {
      firstName: "test",
      lastName: "test",
      email: "test@gmail.com",
      password: "test",
      roleId: "1"
    }
    const response = await supertest(app.app)
        .post('/users/')
        .send(request);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.id.length).not.toBe(0);
    expect(response.body.data.firstName).toBe(request.firstName);
    expect(response.body.data.lastName).toBe(request.lastName);
    expect(response.body.data.email).toBe(request.email);
    expect(response.body.data.referral).toBeDefined();
    expect(response.body.data.referral.length).not.toBe(0);
  })

  it('should reject register new user if email already exists', async () => {
    const request = {
      firstName: "test",
      lastName: "test",
      email: "test@gmail.com",
      password: "test",
      roleId: "2"
    }
    const response = await supertest(app.app)
        .post('/users/')
        .send(request);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('Email already exists!');
  })

  it('should register user admin correctly', async () => {
    const request = {
      firstName: "test2",
      lastName: "test2",
      email: "test2@gmail.com",
      password: "test2",
      roleId: "2"
    }
    const response = await supertest(app.app)
        .post('/users/')
        .send(request);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.id.length).not.toBe(0);
    expect(response.body.data.firstName).toBe(request.firstName);
    expect(response.body.data.lastName).toBe(request.lastName);
    expect(response.body.data.email).toBe(request.email);
    expect(response.body.data.referral).not.toBeDefined();
  })

})
