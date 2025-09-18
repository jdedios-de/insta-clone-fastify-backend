import Fastify from "fastify";
import { postsRoutes } from "./posts.routes";
import FormData from "form-data";
import { fileStorageService } from "src/common/file-storage.service"
import path from "path"
import fs from "fs";

describe("POST /posts", () => {
    it("should create a new post and return it with a 201 status code", async () => {
        const app = Fastify();
        const form = new FormData();
        form.append("caption", "Elephant Rider");

        const uploadDir = path.join(process.cwd(), "public", "uploads");
        const filePath = path.join(uploadDir, "elephant.jpg");

        // Ensure the file exists before running the test
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found at ${filePath}`);
        }

        form.append("file", fs.createReadStream(filePath), {
            filename: "elephant.jpg",
            contentType: "image/jpeg", // Match the actual file type
        });

        // Register multipart plugin
        await app.register(require("@fastify/multipart"));

        // Register your routes
        app.register(postsRoutes);

        const response = await app.inject({
            method: "POST",
            url: "/posts",
            payload: form,
            headers: form.getHeaders(),
        });

        console.log(response);

        expect(response.statusCode).toBe(201); // Expect 201 for resource creation

        const body = response.json();
        expect(body.uploaded.file).toBeDefined();
        expect(body.uploaded.fileType).toBe("image/jpeg"); // Match the uploaded file type
    });

    it("should get all posts and return them with a 200 status code", async () => {
        // Your code goes here
        const app = Fastify();

        const postsSchema = [
            { id: 1, img_url: "http://example.com/image1.jpg", caption: "First post" },
            { id: 2, img_url: "http://example.com/image2.jpg", caption: "Second post" },
        ];

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn().mockReturnValue(postsSchema),
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
                getAll: jest.fn(),
            },
        });

        app.register(postsRoutes);

        const response = await app.inject({
            method: "GET",
            url: "/posts"
        });

        expect(response.statusCode).toBe(200);

        expect(JSON.parse(response.payload)).toEqual(postsSchema);
    });
});