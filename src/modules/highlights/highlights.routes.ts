import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { highlightsService } from "./highlights.service";

interface HighlightParams {
    id: number;
}

const highlightsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = highlightsService(fastify);

    fastify.get("/highlights", async (request, reply) => {
        const getAll = await service.getAll()

        return reply.code(200).send(getAll);
    });

    fastify.get("/highlights/:id", async (request, reply) => {

        const { id } = request.params as { id: string };

        const getById = await service.getById(Number(id));

        return reply.code(200).send(getById);
    });


};

export { highlightsRoutes };