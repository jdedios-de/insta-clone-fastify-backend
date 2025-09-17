import { z } from "zod";

const createReelDtoSchema = z.object({
    video_url: z.string().url(),
    thumbnail_url: z.string().url(),
    views: z.number(),
    caption: z.string().nullable().optional(), // Caption can be a string, null, or undefined
});

const reelSchema = z.object({
    id: z.number(),
    video_url: z.string().url(),
    thumbnail_url: z.string().url(),
    views: z.number(),
    caption: z.string().nullable(),
    created_at: z.string(), // SQLite returns DATETIME as a string by default
});

const reelsSchema = z.array(reelSchema);


type CreateReelDto = z.infer<typeof createReelDtoSchema>;
type Reel = z.infer<typeof reelsSchema>;

export { createReelDtoSchema, reelSchema, reelsSchema, CreateReelDto, Reel };