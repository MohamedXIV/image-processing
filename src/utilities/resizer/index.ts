import express from "express";
import { promises as fs } from "fs";
import * as oldfs from "fs";
import sharp from "sharp";
import path from "path";

const baseDir = "assets/uploads/images";

export default async function Resizer(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {

  // check if imageName exists
  if (!req.query.imageName) {
    res.send("<h3 style='color:red'>Please enter image name</h3>");
    return;
  }

  //check if image folder exists
  if (!oldfs.existsSync(`${baseDir}/${req.query.imageName}`)) {
    res.send(
      "<h3 style='color:orange'>entered imageName doesn't exist in the included images, please stick with Cat, Dog, and Deer</h3>"
    );
    console.log(`${baseDir}/${req.query.imageName}`);
    return;
  }

  // check if width and/or height are present
  if (!req.query.width && !req.query.height) {
    res.send(
      "<h3 style='color:orange'>Please enter a width and/or height</h3>"
    );
    return;
  }

  const imageName = req.query.imageName;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  if (req.query.width && req.query.height && !HasCache(<string>imageName || undefined, res, width, height)) {
    
    GenerateImage(<string>imageName || undefined, res, width, height);
  } else if (
    req.query.width &&
    !req.query.height &&
    !HasCache(<string>imageName || undefined, res, width)
  ) {
    GenerateImage(<string>imageName || undefined, res, width);
  } else if (
    req.query.height &&
    !req.query.width &&
    !HasCache(<string>imageName || undefined, res, width, height)) {
    GenerateImage(<string>imageName || undefined, res, width, height);
  }

  next();
}

// check if image already exists, so send chached image
function HasCache(
  fileName: string | undefined,
  res: express.Response,
  width = 0,
  height = 0,
  bDir: string = baseDir
): boolean {
  //if(fileName === undefined) return;
  const dir = `${bDir}/${fileName}/${fileName}`;
  let absoluteFilePath: string;

  if (height && width && oldfs.existsSync(`${dir}_${width}x${height}.jpg`)) {
    console.log("File exists, serve the cached image: " + `${dir}_${width}x${height}.jpg`);
    absoluteFilePath = path.join(
      __dirname,
      `../../../assets/uploads/images/${fileName}/${fileName}_${width}x${height}.jpg`
    );
    res.sendFile(absoluteFilePath);
    return true;
  } else if (width && !height && oldfs.existsSync(`${dir}_w_${width}.jpg`)) {
    console.log("File exists, serve the cached image: " + `${dir}_w_${width}.jpg`);
    absoluteFilePath = path.join(
      __dirname,
      `../../../assets/uploads/images/${fileName}/${fileName}_w_${width}.jpg`
    );
    res.sendFile(absoluteFilePath);
    return true;
  } else if (height && !width && oldfs.existsSync(`${dir}_h_${height}.jpg`)) {
    console.log("File exists, serve the cached image: " + `${dir}_h_${height}.jpg`);
    absoluteFilePath = path.join(
      __dirname,
      `../../../assets/uploads/images/${fileName}/${fileName}_h_${height}.jpg`
    );
    res.sendFile(absoluteFilePath);
    return true;
  }
  return false;
}

export async function GenerateImage(
  fileName: string | undefined,
  res: express.Response | null = null,
  width = 0,
  height = 0,
  bDir: string = baseDir
): Promise<void> {
  console.log("Generating image...");

  if (height && width) {
    try {
      const originalImage: Buffer = await fs.readFile(
        `${bDir}/${fileName}/${fileName}.jpg`
      );
      await sharp(originalImage)
        .resize(width, height)
        .toFile(`assets/uploads/images/${fileName}/${fileName}_${width}x${height}.jpg`);
        const dir = path.join(__dirname, `../../../assets/uploads/images/${fileName}/${fileName}_${width}x${height}.jpg`);
        res?.sendFile(dir);
    } catch (err) {
      console.error(err);
    }
  } else if (width) {
    try {
      const originalImage: Buffer = await fs.readFile(
        `${bDir}/${fileName}/${fileName}.jpg`
      );
      await sharp(originalImage)
        .resize(width)
        .toFile(`assets/uploads/images/${fileName}/${fileName}_w_${width}.jpg`);
        const dir = path.join(__dirname, `../../../assets/uploads/images/${fileName}/${fileName}_w_${width}.jpg`);
        res?.sendFile(dir);
    } catch (err) {
      console.error(err);
    }
  } else if (height) {
    try {
      const originalImage: Buffer = await fs.readFile(
        `${bDir}/${fileName}/${fileName}.jpg`
      );
      await sharp(originalImage)
        .resize(height)
        .toFile(`assets/uploads/images/${fileName}/${fileName}_h_${height}.jpg`);
        const dir = path.join(__dirname, `../../../assets/uploads/images/${fileName}/${fileName}_h_${height}.jpg`);
          res?.sendFile(dir);
    } catch (err) {
      console.error(err);
    }
  }
}
