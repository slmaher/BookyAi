import { z } from "zod";

import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_PDF_TYPES,
  MAX_FILE_SIZE,
  MAX_IMAGE_SIZE,
} from "@/lib/constants";

const pdfFileSchema = z
  .custom<File>((value) => value instanceof File, {
    message: "PDF file is required",
  })
  .refine((file) => ACCEPTED_PDF_TYPES.includes(file.type), {
    message: "Please upload a valid PDF file",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "PDF must be 50MB or less",
  });

const coverImageSchema = z
  .custom<File | undefined>((value) => value === undefined || value instanceof File)
  .optional()
  .refine(
    (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Cover image must be JPG, PNG, or WEBP"
  )
  .refine((file) => !file || file.size <= MAX_IMAGE_SIZE, "Cover image must be 10MB or less");

export const UploadSchema = z.object({
  pdfFile: pdfFileSchema,
  coverImage: coverImageSchema,
  title: z.string().trim().min(2, "Title is required"),
  author: z.string().trim().min(2, "Author name is required"),
  voice: z.enum(["dave", "daniel", "chris", "rachel", "sarah"], {
    message: "Please select a voice",
  }),
});

export type UploadSchemaType = z.infer<typeof UploadSchema>;
