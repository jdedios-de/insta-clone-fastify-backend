import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";

export const fileStorageService = {
    async saveImage(fileBuffer: Buffer, originalFilename: string): Promise<string> {
        // Use /tmp for writable storage in Vercel
        const uploadDir = path.join("/tmp", "uploads");

        // Create the directory if it doesn't exist
        await fs.mkdir(uploadDir, { recursive: true });

        const fileExtension = path.extname(originalFilename);
        const uniqueFilename = `${randomUUID()}${fileExtension}`;
        const filePath = path.join(uploadDir, uniqueFilename);

        // Save the file
        await fs.writeFile(filePath, fileBuffer);

        // Return the temporary file path
        // ⚠️ Note: This path is ephemeral on Vercel and will disappear after execution
        return filePath;
    },
};