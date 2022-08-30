import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { testUser1 as testUser } from './mocks/users.mock';

const signUpPath = '/auth/sign-up';
const signInPath = '/auth/sign-in';

describe('Auth Module (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    );

    await app.init();

    // deleting all data
    await request(app.getHttpServer()).delete('/test');
  });

  describe('/auth/sign-up (POST)', () => {
    it('should return 201 (Created) when using a correct body', async () => {
      const signUpResponse = await request(app.getHttpServer())
        .post(signUpPath)
        .send(testUser)
        .expect(201);

      const { email, firstName, lastName } = testUser;

      expect(signUpResponse.body).toEqual({
        email,
        firstName,
        id: expect.any(Number),
        lastName,
        role: 'client',
      });
    });

    it('should return 400 (Bad Request) when using an empty body', async () => {
      const signUpResponse = await request(app.getHttpServer())
        .post(signUpPath)
        .send({})
        .expect(400);

      expect(signUpResponse.body).toEqual({
        error: 'Bad Request',
        message: [
          'email should not be empty',
          'email must be an email',
          'password should not be empty',
          'password must be a string',
          'firstName should not be empty',
          'firstName must be a string',
          'lastName should not be empty',
          'lastName must be a string',
        ],
        statusCode: 400,
      });
    });

    it('should return 400 (Bad Request) when using a repeated email', async () => {
      await request(app.getHttpServer()).post(signUpPath).send(testUser);

      const signUpResponse = await request(app.getHttpServer())
        .post(signUpPath)
        .send(testUser)
        .expect(400);

      expect(signUpResponse.body).toEqual({
        error: 'Bad Request',
        message: 'Email is already in use',
        statusCode: 400,
      });
    });
  });

  describe('/auth/sign-in (POST)', () => {
    beforeEach(async () => {
      // creating a new user
      await request(app.getHttpServer()).post(signUpPath).send(testUser);
    });

    it('should return 201 (Created) when using valid credentials', async () => {
      const { email, firstName, lastName, password } = testUser;

      const signInResponse = await request(app.getHttpServer())
        .post(signInPath)
        .auth(email, password, { type: 'basic' })
        .expect(201);

      expect(signInResponse.body).toEqual({
        access_token: expect.any(String),
        user: {
          email: email,
          firstName,
          id: expect.any(Number),
          lastName,
          role: 'client',
        },
      });
    });

    it('should return 401 (Unauthorized) when using invalid email', async () => {
      const signInResponse = await request(app.getHttpServer())
        .post(signInPath)
        .auth('someone', testUser.password, { type: 'basic' })
        .expect(401);

      expect(signInResponse.body).toEqual({
        error: 'Unauthorized',
        message: 'Not allowed - Wrong credentials',
        statusCode: 401,
      });
    });

    it('should return 401 (Unauthorized) when using invalid password', async () => {
      const signInResponse = await request(app.getHttpServer())
        .post(signInPath)
        .auth(testUser.email, 'else', { type: 'basic' })
        .expect(401);

      expect(signInResponse.body).toEqual({
        error: 'Unauthorized',
        message: 'Not allowed - Wrong credentials',
        statusCode: 401,
      });
    });
  });

  describe('/auth/check (GET)', () => {
    let token: string;

    beforeEach(async () => {
      // creating a new user
      await request(app.getHttpServer()).post(signUpPath).send(testUser);

      // signing in
      const signInResponse = await request(app.getHttpServer())
        .post(signInPath)
        .auth(testUser.email, testUser.password, { type: 'basic' });

      // saving the token
      token = signInResponse.body.access_token;
    });

    it('should return 200 (OK) when sending a correct token', async () => {
      const checkResponse = await request(app.getHttpServer())
        .get('/auth/check')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { email, firstName, lastName } = testUser;

      expect(checkResponse.body).toEqual({
        email,
        firstName,
        id: expect.any(Number),
        lastName,
        role: 'client',
      });
    });

    it('should return 401 (Unauthorized) when sending an incorrect token', async () => {
      const checkResponse = await request(app.getHttpServer())
        .get('/auth/check')
        .set('Authorization', `Bearer 12346789`)
        .expect(401);

      expect(checkResponse.body).toEqual({
        message: 'Unauthorized',
        statusCode: 401,
      });
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
