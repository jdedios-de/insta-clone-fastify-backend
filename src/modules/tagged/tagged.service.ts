import type { FastifyInstance } from "fastify";

const taggedService = (fastify: FastifyInstance) => {
    return {
        getAll: async () => {
            fastify.log.info(`Retrieving all tagged`);

            const tagged = fastify.transactions.tagged.getAll();

            return tagged;
        },
    };
};

export { taggedService };