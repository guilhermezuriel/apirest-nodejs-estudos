import {afterAll, beforeAll, expect, it} from 'vitest';

import { app } from '../src/app';

import request from 'supertest';
import { describe } from 'node:test';

describe('Transaction routes', ()=>{
  beforeAll(async()=>{
    await app.ready();
  })
  
  afterAll(async()=>{
    await app.close();
  })
  
  it('Should be to create a new transaction',async()=>{
    await request(app.server)
    .post('/transactions')
    .send({
      title:'New transaction',
      amount: 5000,
      type:'credit'
    })
    .expect(201)
  })
})

