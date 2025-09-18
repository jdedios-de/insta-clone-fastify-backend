import type { FastifyInstance } from "fastify";
import { fileStorageService } from "src/common/file-storage.service"
import { CreatePostDto } from "src/modules/posts/posts.types"

type CreatePostData = {
    img_url: string; // This will now come from our storage service
    caption: string;
};

type CreatePostServiceArgs = {
    caption: string;
    imageFile?: { buffer: Buffer; filename: string }; // New optional image file
};

const postsService = (fastify: FastifyInstance) => {
    return {
        create: async (data: CreatePostServiceArgs) => {
            fastify.log.info(`Creating a new post`);

            let img_url = data.caption; // Fallback if no image, or placeholder


            if (data.imageFile) {
                // If an image is provided, save it and get the URL
                img_url = await fileStorageService.saveImage(
                    data.imageFile.buffer,
                    data.imageFile.filename,
                );
            }

            const postParameter: CreatePostDto = {
                img_url: img_url,
                caption: data.caption,
            };

            console.log("++++++++++++++++++++++++");
            console.log(postParameter);
            const post = fastify.transactions.posts.create(postParameter);

            return post;
        },
        getAll: async () => {
            fastify.log.info(`Retrieving all posts`);

            const posts = fastify.transactions.posts.getAll();
            return posts;
        },
    };
};

export { postsService };