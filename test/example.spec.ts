import {afterAll, beforeAll, expect, test} from 'vitest';

import { app } from '../src/app';

import request from 'supertest';

beforeAll(async()=>{
  await app.ready();
})

afterAll(async()=>{
  await app.close();
})

test('O usuário consegue criar uma nova transação',async()=>{
  await request(app.server)
  .post('/transactions')
  .send({
    title:'New transaction',
    amount: 5000,
    type:'credit'
  })
  .expect(201)
})