const app = require('../routes');
const supertest = require('supertest');

describe('API Routes', () => {
    test('GET /', async () => {
        const response = await supertest(app).get('/');
        expect(response.statusCode).toEqual(200);
    });

    test('POST /login --User not found', async () => {
        const body = {
            username: "test@mail.com",
            password: "123456"
        };
        const response = await supertest(app).post('/login').send(body);

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual('User not found with the email: test@mail.com');
    });

    test('POST /login --Invalid credentials', async () => {
        const body = {
            username: "johndoe@mail.com",
            password: "123456"
        };
        const response = await supertest(app).post('/login').send(body);

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Invalid credentials');
    });

    test('POST /login --User inactive', async () => {
        const body = {
            username: "mr_t@mail.com",
            password: "123456"
        };
        const response = await supertest(app).post('/login').send(body);

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual('User inactive');
    });
});
