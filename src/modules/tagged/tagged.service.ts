import type { FastifyInstance } from "fastify";
import { CreateReelDto } from "./reels.types";

const reelsService = (fastify: FastifyInstance) => {
    return {
        getAll: async () => {
            fastify.log.info(`Retrieving all reels`);

            const posts = fastify.transactions.reels.getAll();
            return posts;
        },
    };
};

export { reelsService };