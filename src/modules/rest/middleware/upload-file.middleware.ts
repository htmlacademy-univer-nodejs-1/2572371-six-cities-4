import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {extension} from 'mime-types';
import {nanoid} from 'nanoid';
import {resolve, join} from 'node:path';
import {promises as fs} from 'node:fs';
import {MiddlewareInterface} from '../middleware.interface.js';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private readonly baseDirectory: string,
    private readonly uploadDirectory: string,
    private readonly fieldName: string,
    private readonly allowedMimeTypes: string[] = ['image/jpeg', 'image/png', 'image/gif'],
    private readonly fileSizeLimit: number = 5 * 1024 * 1024
  ) {
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const contentType = req.headers['content-type'];

    if (!contentType) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Content-Type header is missing'
      });
      return;
    }

    if (!this.allowedMimeTypes.includes(contentType)) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: `Unsupported file type: ${contentType}. Allowed types: ${this.allowedMimeTypes.join(', ')}`
      });
      return;
    }

    const chunks: Buffer[] = [];
    let fileSize = 0;

    req.on('data', (chunk) => {
      chunks.push(chunk);
      fileSize += chunk.length;

      if (fileSize > this.fileSizeLimit) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: `File too large. Maximum size is ${this.fileSizeLimit / 1024 / 1024}MB`
        });
        req.destroy();
      }
    });

    req.on('error', (err) => {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: `Upload error: ${err.message}`
      });
    });

    req.on('end', async () => {
      if (res.writableEnded) {
        return;
      }

      const fileBuffer = Buffer.concat(chunks);

      const fileExtension = extension(contentType) || 'bin';
      const filename = `${nanoid()}.${fileExtension}`;

      const uploadDirectoryPath = this.baseDirectory;
      const destinationPath = resolve(uploadDirectoryPath, this.uploadDirectory);
      await fs.mkdir(destinationPath, {recursive: true});

      const filePath = join(destinationPath, filename);

      await fs.writeFile(filePath, fileBuffer);

      const relativePath = filePath
        .split(uploadDirectoryPath)[1]
        .replace(/\\/g, '/');

      req.body = req.body || {};
      req.body[this.fieldName] = `/uploads${relativePath}`;

      next();

    });
  }
}
