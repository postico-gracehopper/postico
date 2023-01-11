/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { User } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')



describe('User routes',  () => {
  // const users_ = await User.findAll()
  // const nUsers = users_.length

  beforeEach(async() => {
    // await seed();
    // const allUsrs = await User.findAll()
    // const nUsers = allUsrs.length
    
  })

  describe('/api/users/', () => {


    // Get all users, ensure that the count is x
    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.above(3);
    })

    // Try to access users as a nobody

    // try to access users as a user 

    // Get one user, known to exist
      // object 
    it('GET /api/users/2', async () => {
      const res = await request(app)
        .get('/api/users/2')
        .expect(200)
      
      expect(res.body).to.be.an('object')
      expect(Object.keys(res.body)).to.be.an('array')
      expect(Object.keys(res.body).length).to.be.above(5)
    })
    
    // Add a user
      // check if exists
    
    // Modify a user
      //

    // Delete a user
      // check if gone
    
  }) // end describe('/api/users')
}) // end describe('User routes')
