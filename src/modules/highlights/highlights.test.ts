import Fastify from "fastify";
import { highlightsRoutes } from "./highlights.routes";

describe("Highlights API", () => {

    it("GET /highlights should return all highlights with 200 status", async () => {
        const app = Fastify();

        const highlightsSchema = [
            { id: 1, cover_image_url: "http://example.com/image1.jpg", title: "First title" },
            { id: 2, cover_image_url: "http://example.com/image2.jpg", title: "Second title" },
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
                getAll: jest.fn(),
            },
            highlights: {
                getById: jest.fn(),
                getAll: jest.fn().mockReturnValue(highlightsSchema),
            },
        });

        app.register(highlightsRoutes);

        const response = await app.inject({
            method: "GET",
            url: "/highlights",
        });


        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.payload)).toEqual(highlightsSchema);
    });

    it("GET /highlights/:id should return a single highlight by ID", async () => {

        const app = Fastify();

        const newHighlightPayload = {
            cover_image_url: "http://example.com/new-image.jpg",
            title: "My Title",
        };

        const createdHighlight = { ...newHighlightPayload, id: 1 };

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
                getAll: jest.fn(),
            },
            highlights: {
                getById: jest.fn().mockReturnValue(createdHighlight),
                getAll: jest.fn(),
            },
        });

        app.register(highlightsRoutes);

        const response = await app.inject({
            method: "GET",
            url: `/highlights/${createdHighlight.id}`,
        });

        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.payload);
        expect(data).toHaveProperty("id", createdHighlight.id);
        expect(data).toHaveProperty("title");
    });

});