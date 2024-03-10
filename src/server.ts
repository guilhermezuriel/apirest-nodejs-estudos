import env from './env';
import crypto from 'node:crypto';

import fastify from 'fastify';
import cookie from '@fastify/cookie';

import { transactionsRoutes } from './routes/transactions';

const app = fastify();

app.register(cookie);
//Middleware de contexto global
app.addHook('preHandler',async(req)=>{
    console.log(`${req.method}`)
})
app.register(transactionsRoutes,{
    prefix:'transactions'
});
app.listen({port:env.PORT}).then(()=>console.log('HTTP Server Running!'))