import ws from 'ws'
import {PrismaClient} from '@prisma/client'
import {PrismaNeon} from '@prisma/adapter-neon'
import {neonConfig, Pool} from '@neondatabase/serverless'

const prismaClientSingleton = () => {
    neonConfig.webSocketConstructor = ws
    const connectionString = `${process.env.DATABASE_URL}`

    const pool = new Pool({ connectionString })
    const adapter = new PrismaNeon(pool)
    return new PrismaClient({adapter})
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma