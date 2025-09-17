import { z } from "zod";

// First, we define the zod schemas
const createHighlightDtoSchema = z.object({
    cover_image_url: z.string().url(),
    title: z.string().nonempty(),
});

const highlightSchema = z.object({
    id: z.number(),
    cover_image_url: z.string().url(),
    title: z.string().nonempty(),
    created_at: z.string(),
});

const highlightsSchema = z.array(highlightSchema);

type CreateHighlightDto = z.infer<typeof createHighlightDtoSchema>;
type Highlight = z.infer<typeof highlightSchema>;

export { createHighlightDtoSchema, highlightSchema, highlightsSchema, CreateHighlightDto, Highlight };