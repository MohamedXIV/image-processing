import supertest from "supertest";
import app from "../index";
import { GenerateImage } from "../utilities/resizer";
import path from "path";
import * as oldfs from "fs";

const req = supertest(app);

describe("Test endpoint responses", (): void => {
  it("Test if the app is running", async () => {
    const res = await req.get("/api");
    expect(res.status).toBe(200);
  });
  it("Test resize endpoint", async () => {
    const res = await req.get("/api/resize");
    expect(res.status).toBe(200);
  });
  it("Test imageName query", async () => {
    const res = await req.get("/api/resize?imageName");
    expect(res.status).toBe(200);
  });
  it("Test creating a new image", async () => {
    const imageName = "test";
    const width = 480;
    //await req.get(`/api/resize?imageName=${imageName}&width=${width}`);
    await GenerateImage(imageName, null, width);
    const absoluteFilePath = path.join(
      __dirname,
      `../../../assets/uploads/images/${imageName}/${imageName}_w_${width}.jpg`
    );
    const isFileExists = oldfs.existsSync(absoluteFilePath);
    expect(isFileExists).toBeTruthy();
  });
});
