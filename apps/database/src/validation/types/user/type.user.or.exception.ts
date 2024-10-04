import { User } from "@prisma/client";

export type UserOrException = User | string;
