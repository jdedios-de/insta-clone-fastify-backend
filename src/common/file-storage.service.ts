import path from "path";
import fspromise from "fs/promises";
import fs from "fs";

import { randomUUID } from "crypto";

export const fileStorageService = {
    async saveImage(
        fileBuffer: Buffer,
        originalFilename: string,
    ): Promise<string> {
        const uploadDir = path.join(process.cwd(), "tmp", "uploads");

        await fs.promises.mkdir(uploadDir, { recursive: true });

        const fileExtension = path.extname(originalFilename);
        const uniqueFilename = `${randomUUID()}${fileExtension}`;
        const filePath = path.join(uploadDir, uniqueFilename);

        await fspromise.writeFile(filePath, fileBuffer);

        // Return the public URL path
        return `/uploads/${uniqueFilename}`;
    },
};