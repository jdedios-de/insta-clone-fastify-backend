import { z } from "zod";

const createTaggedDtoSchema = z.object({
    img_url: z.string().url(),
    caption: z.string().nullable().optional(),
});

const taggedSchema = z.object({
    id: z.number(),
    img_url: z.string().url(),
    caption: z.string().nullable(),
    tagged_by_user: z.string().nonempty(),
    created_at: z.string(),
});

const taggedsSchema = z.array(taggedSchema);


type CreateTaggedDto = z.infer<typeof createTaggedDtoSchema>;
type Tagged = z.infer<typeof taggedSchema>;

export { createTaggedDtoSchema, taggedSchema, taggedsSchema, CreateTaggedDto, Tagged };