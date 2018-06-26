import { server } from '../server/index';
import Request from '../server/models/request';
import chai from 'chai';

chai.use(require('chai-http'));
const requester = chai.request(server).keepOpen();

describe('[X] Request sending', () => {
    beforeAll(done => {
        Request.deleteMany({})
            .then(() => done())
            .catch(err => console.error(err));
    });
    afterAll(() => { requester.close() });

    test('# Send request with correct data', (done) => {
        const data = {
            email: {
                field: 'wertyga18@gmail.com',
                require: true
            },
            message: {
                field: 'Some message',
                require: true
            }
        };
        requester
            .post('/fetch/request')
            .send(data)
            .then(res => {
                expect(res.status).toBe(200);

                done();
            })
    });
    test('# Send request with no require property in send object', (done) => {
        const data = {
            email: 'wertyga18@gmail.com',
            message: 'Some message'
        };
        requester
            .post('/fetch/request')
            .send(data)
            .then(res => {
                const body = res.body;
                expect(res.status).toBe(400);
                expect(typeof body.errors.email).toEqual('string');
                expect(typeof body.errors.message).toEqual('string');

                done();
            })
    });
    test('# Send request with only string', (done) => {
        const data = 'Some script field';
        requester
            .post('/fetch/request')
            .send(data)
            .then(res => {
                const body = res.body;
                expect(res.status).toBe(400);
                expect(body.errors).toHaveProperty('globalError');

                done();
            })
    });
    test('# Send request with array', (done) => {
        const data = ['Some script field'];
        requester
            .post('/fetch/request')
            .send(data)
            .then(res => {
                const body = res.body;
                expect(res.status).toBe(400);
                expect(body.errors).toHaveProperty('globalError');

                done();
            })
    });
});