import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { extension } from 'mime-types';
import multer, { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { resolve } from 'node:path';
import { MiddlewareInterface } from '../middleware.interface.js';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private readonly baseDirectory: string,
    private readonly uploadDirectory: string,
    private readonly fieldName: string,
    private readonly allowedMimeTypes: string[] = ['image/jpeg', 'image/png', 'image/gif']
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const uploadDirectoryPath = this.baseDirectory;
    const destinationPath = resolve(uploadDirectoryPath, this.uploadDirectory);

    const storage = diskStorage({
      destination: destinationPath,
      filename: (_req, file, callback) => {
        const fileExtension = extension(file.mimetype) || 'bin';
        const filename = nanoid();
        callback(null, `${filename}.${fileExtension}`);
      }
    });

    const fileFilter = (_req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
      if (this.allowedMimeTypes.includes(file.mimetype)) {
        return callback(null, true);
      }

      callback(new Error(`Unsupported file type: ${file.mimetype}. Allowed types: ${this.allowedMimeTypes.join(', ')}`));
    };

    const upload = multer({
      storage,
      fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
    }).single(this.fieldName);

    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: `File upload error: ${err.message}`
        });
        return;
      } else if (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: err.message
        });
        return;
      }

      if (req.file) {
        const relativePath = req.file.path
          .split(uploadDirectoryPath)[1]
          .replace(/\\/g, '/'); // Handle Windows paths

        req.body[this.fieldName] = `/uploads${relativePath}`;
      }

      next();
    });
  }
}
