import { z } from "zod";

export const blogValidationSchemaZod = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    author: z.string(),
    isPublished: z.boolean().default(true),
  }),
});
