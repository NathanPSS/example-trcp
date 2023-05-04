import express from "express";
import cors from 'cors'
import { initTRPC } from '@trpc/server'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { z } from 'zod'

const globalAPIEndpoint = "/trpc"

let count = 1

const t = initTRPC.create()

const server = express();
let data :Array<any> = []

export const appRouter = t.router({
    addUser: t.procedure.input(
        z.object({
        email: z.string(),
        nome: z.string(),
    }))
    .mutation((input) =>{
       const user = {
        id: count++,
        email: input.input.email,
        nome: input.input.nome
       }
       data.push(user)
       return `User ${user} adicionado`
    }),
    getUsers: t.procedure.query(() =>{
        return data
    }),
    removeUserById: t.procedure.input(z.number())
    .mutation((input) =>{
       data.map((element,index) =>{
        if(element.id === input.input){
            data.splice(index,1)
        }
       })
    }),
})

server.use(cors({origin: "http://localhost:5173"}))

server.use(globalAPIEndpoint,createExpressMiddleware({router: appRouter}))

server.listen(3000,() => {console.log(`Server na porta 3000`)})

export type AppRouter = typeof appRouter

