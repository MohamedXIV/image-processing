import supertest from "supertest";
import app from "../index";

const req = supertest(app);

describe("Test endpoint responses", (): void => {
  it("gets the api endpoint", async () => {
    const res = await req.get("/api");
    expect(res.status).toBe(200);
  });
  it("test resize endpoint", async () => {
    const res = await req.get("/api/resize");
    expect(res.status).toBe(200);
  });
  it("test resize endpoint", async () => {
    const res = await req.get("/api/resize");
    expect(res.status).toBe(200);
  });
});
