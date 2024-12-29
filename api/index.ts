import { Hono } from "hono";
import { handle } from "hono/vercel";
import { SignJWT } from "jose";
import { setCookie } from "hono/cookie";
import dotenv from "dotenv";

dotenv.config();

export const app = new Hono().basePath("/api");

// See seed.sql
// In real life you would of course authenticate the user however you like.
const mikael = "ycD76wW4R2";

app.get("/login", async (c) => {
  const jwtPayload = {
    sub: mikael,
    iat: Math.floor(Date.now() / 1000),
  };

  const jwt = await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30days")
    .sign(new TextEncoder().encode(must(process.env.ZERO_AUTH_SECRET)));

  setCookie(c, "jwt", jwt, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return c.text("ok");
});

export default handle(app);

function must<T>(val: T) {
  if (!val) {
    throw new Error("Expected value to be defined");
  }
  return val;
}
