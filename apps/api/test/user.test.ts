import supertest from 'supertest'
import { UserTestHelper } from './utils/userTestHelper'
import App from '@/app'
import { VoucherTestHelper } from './utils/voucherTestHelper';

const app = new App();

describe('POST /api/users/', () => {
  
  afterEach(async() => {
    await VoucherTestHelper.delete();
    await UserTestHelper.delete();
  })
  
  it('should reject register new user if request is invalid', async () => {
    const response = await supertest(app.app)
        .post('/api/users/')
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

  it('should reject register new user when refReferral is invalid', async () => {
    const response = await supertest(app.app)
        .post('/api/users/')
        .send({
          firstName: "test",
          lastName: "test",
          email: "test@gmail.com",
          password: "test",
          roleId: "1",
          refReferral: "xxx"
        });

    expect(response.status).toBe(404);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('Referral not found');
  })

  it('should register user correctly without refReferral', async () => {
    const request = {
      firstName: "test",
      lastName: "test",
      email: "test@gmail.com",
      password: "test",
      roleId: "1"
    }
    const response = await supertest(app.app)
        .post('/api/users/')
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
    await supertest(app.app)
      .post('/api/users/')
      .send(request);

    const request2 = {
      firstName: "test",
      lastName: "test",
      email: "test@gmail.com",
      password: "test",
      roleId: "2"
    }
    const response2 = await supertest(app.app)
        .post('/api/users/')
        .send(request2);

    expect(response2.status).toBe(400);
    expect(response2.body.status).toBe('fail');
    expect(response2.body.message).toBe('Email already exists!');
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
        .post('/api/users/')
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

  it('should earn voucher for new user and earn point for referral owners when register with refReferral', async () => {
    const request = {
      firstName: "test",
      lastName: "test",
      email: "test@gmail.com",
      password: "test",
      roleId: "1"
    }
    const response = await supertest(app.app)
        .post('/api/users/')
        .send(request);

    const request2 = {
      firstName: "test2",
      lastName: "test2",
      email: "test2@gmail.com",
      password: "test2",
      roleId: "1",
      refReferral: response.body.data.referral
    }
    const response2 = await supertest(app.app)
        .post('/api/users/')
        .send(request2);

    const voucherUser1 = await VoucherTestHelper.getByUserId(response.body.data.id)
    const voucherUser2 = await VoucherTestHelper.getByUserId(response2.body.data.id)

    expect(voucherUser1.type).toBe('point');
    expect(voucherUser1.points).toBe(10000);
    expect(voucherUser1.userId).toBe(response.body.data.id);
    expect(voucherUser2.type).toBe('discount');
    expect(voucherUser2.discount).toBe(10);
    expect(voucherUser2.userId).toBe(response2.body.data.id);
  })

  it('should increase points for referral owners when more then one user registers with refReferral', async () => {
    const request = {
      firstName: "test",
      lastName: "test",
      email: "test@gmail.com",
      password: "test",
      roleId: "1"
    }
    const response = await supertest(app.app)
        .post('/api/users/')
        .send(request);

    const request2 = {
      firstName: "test2",
      lastName: "test2",
      email: "test2@gmail.com",
      password: "test2",
      roleId: "1",
      refReferral: response.body.data.referral
    }
    await supertest(app.app)
      .post('/api/users/')
      .send(request2);

    const request3 = {
      firstName: "test3",
      lastName: "test3",
      email: "test3@gmail.com",
      password: "test3",
      roleId: "1",
      refReferral: response.body.data.referral
    }
    await supertest(app.app)
      .post('/api/users/')
      .send(request3);

    const voucherUser1 = await VoucherTestHelper.getByUserId(response.body.data.id)

    expect(voucherUser1.type).toBe('point');
    expect(voucherUser1.points).toBe(20000);
  })

})
