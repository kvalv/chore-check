import { SignJWT, decodeJwt } from "jose";

interface Env {}

// const mikael = "ycD76wW4R2";

function must<T>(val: T) {
  if (!val) {
    throw new Error("Expected value to be defined");
  }
  return val;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // read token from CF_Authorization

  const cloudflareToken = context.request.headers.get("CF_Authorization");
  if (!cloudflareToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const cfClaims = decodeJwt(cloudflareToken);

  const jwtPayload = {
    sub: cfClaims.sub,
    email: cfClaims.email,
    iat: Math.floor(Date.now() / 1000),
  };

  const key = context.env.ZERO_AUTH_SECRET;
  const jwt = await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30days")
    .sign(new TextEncoder().encode(must(key)));

  return new Response("yay", {
    headers: {
      "Set-Cookie": `jwt=${jwt}; Expires=${new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toUTCString()}; Path=/`,
    },
  });
};
