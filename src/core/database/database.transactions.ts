import type { Database } from "better-sqlite3";
import { CreatePostDto } from "src/modules/posts/posts.types";

// This factory function creates and returns our transaction helpers.
const createTransactionHelpers = (db: Database) => {
    // We use prepared statements for security and performance.
    const statements = {
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare(
            "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
        ),
        getAllReels: db.prepare("SELECT * FROM reels"),
        getAllTaggeds: db.prepare(
            "SELECT posts.*, tagged.tagged_by_user FROM posts INNER JOIN tagged ON posts.id = tagged.post_id"
        ),
        getHighlightsById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
        getAllHighlights: db.prepare("SELECT * FROM highlights"),
    }

    const posts = {
        getById: (id: number) => {
            return statements.getPostById.get(id);
        },
        getAll: () => {
            return statements.getAllPosts.all();
        },
        create: (data: CreatePostDto) => {
            return statements.createPost.get(data);
        },
    };

    const reels = {
        getAll: () => {
            return statements.getAllReels.all();
        },
    };

    const tagged = {
        getAll: () => {
            return statements.getAllTaggeds.all();
        },
    };

    const highlights = {
        getById: (id: number) => {
            return statements.getHighlightsById.get(id);
        },
        getAll: () => {
            return statements.getAllHighlights.all();
        },
    };

    return {
        posts,
        reels,
        tagged,
        highlights
    };
};

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>;
export { createTransactionHelpers };