import supertest from "supertest";
import app from "../index";

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
});
