import supertest from 'supertest';
import App from '@/app';
import fs from 'fs';
import path from 'path';
import { UserTestHelper } from './utils/userTestHelper';
import { EventTestHelper } from './utils/eventTestHelper';

const app = new App();

describe('POST /api/events/', () => {
  const filePath = `${__dirname}/utils/testFiles/Screenshot (1).png`

  afterEach(async() => {
    await EventTestHelper.delete();
    await UserTestHelper.delete();
  })

  beforeEach(async() => {
    await UserTestHelper.add();
  })
  
  it('should throw error and remove image from folder when token is invalid', async () => {
    const response = await supertest(app.app)
      .post('/api/events/')
      .set('token', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItdXVpZHY0Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTM1ODYwMzEsImV4cCI6MTcxMzU4NjA5MX0.WJfQGVyqguQGSxJZCUbkbW6aPbpS_CDrjLdGvJuPe3U')
      .attach('file', filePath)
      .field('title', 'Title event')
      .field('desc', 'Description event')
      .field('start', '2024-05-15T13:48:09.133+07:00')
      .field('lastRegister', '2024-05-08T13:48:09.133+07:00')
      .field('price', 13000)
      .field('attendee', 50)
      .field('location', 'Jakarta')
      .field('type', 'Seminar')
    
    expect(response.status).toBe(403);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('Token is invalid');
  })
  
  it('should throw error validator and remove image from folder when request is invalid', async () => {
    const auth = await supertest(app.app)
        .post('/api/auth/')
        .send({
          email: 'test@gmail.com',
          password: 'secret'
        })

    const response = await supertest(app.app)
      .post('/api/events/')
      .set('token', 'Bearer ' + auth.body.data.token)
      .attach('file', filePath)
      .field('title', '')
      .field('desc', '')
      .field('start', '')
      .field('lastRegister', '')
      .field('price', '')
      .field('attendee', '')
      .field('location', '')
      .field('type', '')
    
    expect(response.status).toBe(400);
    expect(response.body.status).toBe('fail');
    expect(typeof response.body.message).toBe('object');
    expect(fs.existsSync(response.body.filePath)).toBe(false);
  })

  it('should create event correctly', async () => {
    const auth = await supertest(app.app)
        .post('/api/auth/')
        .send({
          email: 'test@gmail.com',
          password: 'secret'
        })
    const response = await supertest(app.app)
      .post('/api/events/')
      .set('token', 'Bearer ' + auth.body.data.token)
      .attach('file', filePath)
      .field('title', 'Title event')
      .field('desc', 'Description event')
      .field('start', '2024-05-15T13:48:09.133Z')
      .field('lastRegister', '2024-05-08T13:48:09.133Z')
      .field('price', 13000)
      .field('attendee', 50)
      .field('location', 'Jakarta')
      .field('type', 'Seminar')
      
    const pathImageTest = path.join(__dirname, `../public/images/${response.body.data.image}`);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.title).toBe('Title event');
    expect(response.body.data.desc).toBe('Description event');
    expect(response.body.data.start).toBe('2024-05-15T13:48:09.133Z');
    expect(response.body.data.lastRegister).toBe('2024-05-08T13:48:09.133Z');
    expect(response.body.data.price).toBe(13000);
    expect(response.body.data.attendee).toBe(50);
    expect(response.body.data.location).toBe('Jakarta');
    expect(response.body.data.type).toBe('Seminar');
    expect(fs.existsSync(pathImageTest)).toBe(true);

    fs.unlinkSync(pathImageTest)
  })
})
