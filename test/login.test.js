const request = require('supertest')
const app = require('../dist/app')
const db = require('../dist/database/config/config')

describe('Admin Endpoints', () => {
  it('should login', async (done) => {
    const res = await request(app)
      .post('/admin/login')
      .send({
        password: "password",
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body.message).toEqual('success')
    done()
  })
})

afterAll(() => {
  db.close()
});
