import {PrismaClient} from "../generated/prisma/index.js"


const globalPrisma = globalThis;

export const db = globalPrisma.prisma ?? new PrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisma = db;