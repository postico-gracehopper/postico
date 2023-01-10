/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { User } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')


const users_ = await User.findAll()
const nUsers = users_.length

describe('User routes', () => {
  beforeEach(async() => {
    // await seed();
    // const allUsrs = await User.findAll()
    // const nUsers = allUsrs.length
    
  })

  describe('/api/users/', () => {

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(3);
    })

    // it("POST /api/users", async () => {
    //   const res = await request(app)
    //     .post('/api/users')
    //     .send({"username": "James", 
    //             "password":"123"})
    //     .expect(201)
      
    //   expect(res.body)
    // })

    // it("DELETE /api/users/:id", async () => {
    //   const res = await request(app)
    //     .post('/api/users')
    //     .send({"username": "James", 
    //             "password":"123"})
    //     .expect(201)
    // })

  }) // end describe('/api/users')
}) // end describe('User routes')
