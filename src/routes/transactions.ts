import { FastifyInstance } from "fastify"
import { kknex } from "../database"
import {z} from 'zod'
import { randomUUID } from "node:crypto";

//Cookies <-> Formas da gente manter contexto entre requisições
//


export async function transactionsRoutes(app: FastifyInstance){
  //List all transactions
  app.get('/', async()=>{
    const transactions = await kknex('transactions').select('*')
    return {
      transactions,
    }
  })
  //Query parms to find specific transaction
  app.get('/:id', async(request)=>{
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid()
    })
    const {id}  = getTransactionsParamsSchema.parse(request.params);

    const transactions = await kknex('transactions').where('id',id).first()

    return {transactions}
  })
  //Get summary of transactions
  app.get('/summary', async()=>{
    const summary = await kknex('transactions').sum('amount', {as:'amount'}).first();
    return {summary}
  })

  //Create transaction
  app.post('/', async(request, reply)=>{
    //{title, amount, type}
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const {title, amount, type} =  createTransactionBodySchema.parse(request.body);

    await kknex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount: amount*-1
    })
   
    return reply.status(201).send()
})

}