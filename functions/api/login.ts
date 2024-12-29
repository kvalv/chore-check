import { SignJWT } from "jose";

interface Env {
  KV: KVNamespace;
}

const mikael = "ycD76wW4R2";

function must<T>(val: T) {
  if (!val) {
    throw new Error("Expected value to be defined");
  }
  return val;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const jwtPayload = {
    sub: mikael,
    iat: Math.floor(Date.now() / 1000),
  };

  const jwt = await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30days")
    .sign(new TextEncoder().encode(must(process.env.ZERO_AUTH_SECRET)));

  return new Response("yay", {
    headers: {
      "Set-Cookie": `jwt=${jwt}; Expires=${new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toUTCString()}; Path=/`,
    },
  });
};
