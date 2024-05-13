import supertest from 'supertest'
import { UserTestHelper } from './utils/userTestHelper'
import App from '@/app'

const app = new App();

describe('POST /api/auth/', () => {

  beforeAll(async() => {
    await UserTestHelper.add();
  })

  afterAll(async() => {
    await UserTestHelper.delete();
  })

  it('should login correctly', async () => {
    const request = {
      email: 'test@gmail.com',
      password: 'secret'
    }
    
    const response = await supertest(app.app)
        .post('/api/auth/')
        .send(request);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.id.length).not.toBe(0);
    expect(response.body.data.firstName).toBe('test');
    expect(response.body.data.lastName).toBe('test');
    expect(response.body.data.email).toBe(request.email);
    expect(response.body.data.role).toBe('admin');
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.token.length).not.toBe(0);
  })

  it('should throw error, request not contain data', async () => {
    const request = {
      email: '',
      password: ''
    }
    const response = await supertest(app.app)
        .post('/api/auth/')
        .send(request);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('fail');
    expect(typeof response.body.message).toBe('object');
  })

  it('should throw error, email is wrong', async () => {
    const request = {
      email: 'tes@gmail.com',
      password: 'secret'
    }
    const response = await supertest(app.app)
        .post('/api/auth/')
        .send(request);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('Email or password is wrong');
  })

  it('should throw error, password is wrong', async () => {
    const request = {
      email: 'test@gmail.com',
      password: 'secre'
    }
    const response = await supertest(app.app)
        .post('/api/auth/')
        .send(request);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('Email or password is wrong');
  })

})

describe('DELETE /api/auth/', () => {

  afterAll(async() => {
    await UserTestHelper.delete();
  })

  beforeAll(async() => {
    await UserTestHelper.add();
  })

  it('should logout correctly', async () => {
    const requestLogin = {
      email: 'test@gmail.com',
      password: 'secret'
    }
    const auth = await supertest(app.app)
        .post('/api/auth/')
        .send(requestLogin)
    
    const response = await supertest(app.app)
        .delete('/api/auth/')
        .send({id: auth.body.data.id})

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Succeed delete token');

    const user = await UserTestHelper.get(auth.body.data.id);

    expect(user.token).toBeNull();
  })

  it('should throw error, id not found', async () => {
    const response = await supertest(app.app)
        .delete('/api/auth/')
        .send({id: 'adsd'})

    console.log(response.body)
    expect(response.status).toBe(400);
    expect(response.body.status).toBe('fail');
  })

})