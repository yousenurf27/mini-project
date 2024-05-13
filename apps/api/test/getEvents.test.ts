import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import { EventTestHelper } from './utils/eventTestHelper';
import { UserTestHelper } from './utils/userTestHelper';
import App from '@/app';

const app = new App();

describe('GET /api/events/byId', () => {
  const filePath = `${__dirname}/utils/testFiles/Screenshot (1).png`

  afterEach(async() => {
    await EventTestHelper.delete();
    await UserTestHelper.delete();
  })

  beforeEach(async() => {
    await UserTestHelper.add();
  })

  it('should throw error when authorization is invalid', async () => {
    const auth = await supertest(app.app)
        .post('/api/auth/')
        .send({
          email: 'test@gmail.com',
          password: 'secret'
        })
    const addEvent = await supertest(app.app)
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
    
    const addEvent1 = await supertest(app.app)
      .post('/api/events/')
      .set('token', 'Bearer ' + auth.body.data.token)
      .attach('file', filePath)
      .field('title', 'Title event 2')
      .field('desc', 'Description event 2')
      .field('start', '2024-05-15T13:48:09.133Z')
      .field('lastRegister', '2024-05-08T13:48:09.133Z')
      .field('price', 13000)
      .field('attendee', 50)
      .field('location', 'Jakarta')
      .field('type', 'Seminar')
      
    const response = await supertest(app.app)
      .get('/api/events/byId')
      .set('token', 'Bearer ' + 'xxx.xxx.xxx')

    expect(response.status).toBe(403)
    expect(response.body.status).toBe('fail')
    expect(response.body.message).toBe('Token is invalid')
      
    const pathImageTest = path.join(__dirname, `../public/images/${addEvent.body.data.image}`);
    const pathImageTest1 = path.join(__dirname, `../public/images/${addEvent1.body.data.image}`);

    fs.unlinkSync(pathImageTest)
    fs.unlinkSync(pathImageTest1)
  })

  it('should get data correctly', async () => {
    const auth = await supertest(app.app)
        .post('/api/auth/')
        .send({
          email: 'test@gmail.com',
          password: 'secret'
        })
    const addEvent = await supertest(app.app)
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
    
    const addEvent1 = await supertest(app.app)
      .post('/api/events/')
      .set('token', 'Bearer ' + auth.body.data.token)
      .attach('file', filePath)
      .field('title', 'Title event 2')
      .field('desc', 'Description event 2')
      .field('start', '2024-05-15T13:48:09.133Z')
      .field('lastRegister', '2024-05-08T13:48:09.133Z')
      .field('price', 13000)
      .field('attendee', 50)
      .field('location', 'Jakarta')
      .field('type', 'Seminar')

    const response = await supertest(app.app)
      .get('/api/events/byId')
      .set('token', 'Bearer ' + auth.body.data.token)

    expect(response.body.data.length).toBe(2)
    
    const pathImageTest = path.join(__dirname, `../public/images/${addEvent.body.data.image}`);
    const pathImageTest1 = path.join(__dirname, `../public/images/${addEvent1.body.data.image}`);

    fs.unlinkSync(pathImageTest)
    fs.unlinkSync(pathImageTest1)
  })

})
