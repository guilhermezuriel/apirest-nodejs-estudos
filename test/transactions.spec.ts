import {afterAll, beforeAll, expect, it, beforeEach, describe} from 'vitest';
import {execSync} from 'node:child_process';
import { app } from '../src/app';

import request from 'supertest';

describe('Transaction routes', ()=>{
  beforeAll(async()=>{
    await app.ready();
  })
  
  afterAll(async()=>{
    await app.close();
  })

  beforeEach(()=>{
    execSync("npm run knex migrate:rollback -all");
    execSync("npm run knex migrate:latest")
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

  it('Should be to list all transactions', async()=>{
    const createTransactionResponse = await request(app.server)
    .post('/transactions')
    .send({
      title:'New transaction',
      amount: 5000,
      type:'credit'
    })

    const cookies = createTransactionResponse.get('Set-Cookie');

    const listTransactionResponse = await request(app.server).get('/transactions').set('Cookie', cookies).expect(200);

    expect(listTransactionResponse.body.transactions).toEqual([
      expect.objectContaining({
        title:'New transaction',
        amount: 5000, })])
    })

    it('Should be to able to get a specific transaction', async()=>{
      const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title:'New transaction',
        amount: 5000,
        type:'credit'
      })
  
      const cookies = createTransactionResponse.get('Set-Cookie');
  
      const listTransactionResponse = await request(app.server).get('/transactions').set('Cookie', cookies).expect(200);

      const transactionId = listTransactionResponse.body.transactions[0].id;

      const getTransactionResponse = await request(app.server).get(`/transactions/${transactionId}`).set('Cookie', cookies).expect(200)
  
      expect(getTransactionResponse.body.transactions).toEqual(
        expect.objectContaining({
          id:transactionId}))
      })
})

