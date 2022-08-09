import express from "express";
import { promises as fs } from "fs";
import sharp from "sharp";

export default async function Resizer(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const oldImage = await await fs.readFile("assets/uploads/images/deer.jpg");
  const width: number = parseInt(req.params.width);
  const height: number = parseInt(req.params.height);
  sharp(oldImage)
    .resize(width, height)
    .toFile(`newImage_${width}.jpg`, (err, info) => {
      console.error(err);
      console.log(info);
    });
  next();
}
