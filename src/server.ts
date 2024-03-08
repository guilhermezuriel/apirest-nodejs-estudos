import fastify from 'fastify';
import {kknex} from './database';
import crypto from 'node:crypto';
import env from './env';
const app = fastify();

app.get('/hello', async()=>{
    //Inserção
    /*
    const transactions =  await kknex('transactions').insert({
        id:crypto.randomUUID(),
        title:'Transação de testes',
        amount:1000
    }).returning('*') */
    //Running queries
    const transactions = await kknex('transactions').where('amount', 1000).select('*')

    return transactions
})

app.listen({port:env.PORT}).then(()=>console.log('HTTP Server Running!'))