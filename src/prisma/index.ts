import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let User = prisma.user;

export { User };
