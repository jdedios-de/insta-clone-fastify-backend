import Fastify from "fastify";
import { taggedRoutes } from "./tagged.routes";

describe("GET /tagged/grid", () => {
    it("should return a list of tagged with a 200 status code", async () => {
        const app = Fastify();

        const tagedSchema = [
            { id: 1, img_url: "http://example.com/image1.jpg", caption: "First post", tagged_by_user: "jdedios" },
            { id: 2, img_url: "http://example.com/image2.jpg", caption: "Second post", tagged_by_user: "sdedios" },
        ];


        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn(),
            },
            reels: {
                getAll: jest.fn(),
            },
            tagged: {
                getAll: jest.fn().mockReturnValue(tagedSchema),
            },
            highlights: {
                getById: jest.fn(),
                getAll: jest.fn(),
            },
        });

        app.register(taggedRoutes);

        const response = await app.inject({
            method: "GET",
            url: "/tagged/grid",
        });

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.payload)).toEqual(tagedSchema);
    });
});