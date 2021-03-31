'use strict';
const { server } = require('../src/server.js'); 
const supergoose = require('@code-fellows/supergoose');
// const superTest = require('supertest');
const request = supergoose(server);
let id;
describe('api server', () => {

//food test


  it('should be able to create a food on POST /food', async () => {
    const obj = {
        name: 'test',
        role: 'test',
      };
    const response = await request.post('/api/v1/food').send(obj);
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('test');
    id = response.body._id;
  });
  it('should be able to update a food on PUT /food', async () => {
    const response = await request.put(`/api/v1/food/${id}`).send({
      name: 'test',
      role: 'test',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });
  it('should be able to get a food on Get /food/:id', async () => {
    const response = await request.get(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });



//clothes test


  it('should be able to create a clothes on POST /clothes', async () => {
    const obj = {
        name: 'test',
        role: 'test',
      };
    const response = await request.post('/api/v1/clothes').send(obj);
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('test');
    id = response.body._id;
  });
  it('should be able to update a clothes on PUT /clothes', async () => {
    const response = await request.put(`/api/v1/clothes/${id}`).send({
      name: 'test',
      role: 'clothes',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });
  it('should be able to get a clothes on Get /clothes/:id', async () => {
    const response = await request.get(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });

// 404 on a bad route


  it('handle server errors bad route', async () => {
    const response = await request.get('/bad');
    expect(response.status).toEqual(404);
  });
});