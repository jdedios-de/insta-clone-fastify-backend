import type { FastifyInstance } from "fastify";

const highlightsService = (fastify: FastifyInstance) => {
    return {
        getById: async (id: number) => {
            fastify.log.info(`Retrieving all highlight`);
            const highlight = fastify.transactions.highlights.getById(id);

            return highlight;
        },
        getAll: async () => {
            fastify.log.info(`Retrieving all highlights`);

            const highlights = fastify.transactions.highlights.getAll();
            return highlights;
        },
    };
};

export { highlightsService };