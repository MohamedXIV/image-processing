import supertest from "supertest";
import app from "../index";

const req = supertest(app);

describe("Test endpoint responses", (): void => {
  it("gets the api endpoint", async () => {
    const res = await req.get("/api/resize/480/360");
    expect(res.status).toBe(200);
  });
  // it("gets the api status", async () => {
  //   const res = await req.get("/api/resize");
  //   expect(res.status).toBe(200);
  // });
});
