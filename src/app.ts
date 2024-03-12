import fastify from 'fastify';
import cookie from '@fastify/cookie';

import { transactionsRoutes } from './routes/transactions';

export const app = fastify();

app.register(cookie);
//Middleware de contexto global
app.addHook('preHandler',async(req)=>{
    console.log(`${req.method}`)
})
app.register(transactionsRoutes,{
    prefix:'transactions'
});