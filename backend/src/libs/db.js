import {PrismaClient} from "../generated/prisma/index.js"


const globalPrisma = globalThis;

/** @type {import('../generated/prisma/index.js').PrismaClient} */

export const db = globalPrisma.prisma || new PrismaClient()

if(process.env.NODE_ENV !== "production") globalThis.prisma = db;