import { FastifyInstance } from "fastify"
import { kknex } from "../database"
import {z} from 'zod'
import { randomUUID } from "node:crypto";

export async function transactionsRoutes(app: FastifyInstance){
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