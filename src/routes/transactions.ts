import { FastifyInstance } from "fastify"
import { kknex } from "../database"

export async function transactionsRoutes(app: FastifyInstance){
  app.get('/hello', async()=>{
    const transactions = await kknex('transactions').where('amount', 1000).select('*')
    return transactions
})

}