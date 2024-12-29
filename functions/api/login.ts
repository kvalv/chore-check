import { PagesFunction } from "@cloudflare/workers-types";
import { SignJWT, decodeJwt } from "jose";
import * as cookie from "cookie";

interface Env {
  ZERO_AUTH_SECRET: string;
}

function must<T>(val: T) {
  if (!val) {
    throw new Error("Expected value to be defined");
  }
  return val;
}

// @ts-ignore
export const onRequest: PagesFunction<Env> = async (context) => {
  const cookieHeader = context.request.headers.get("Cookie");
  if (!cookieHeader) {
    return new Response("Unauthorized", { status: 401 });
  }
  const cookies = cookie.parse(cookieHeader);

  // todo: verify integrity of the CF_Authorization jwt
  const cfJWT = cookies["CF_Authorization"];
  if (!cfJWT) {
    return new Response("header 'CF_Authorization' not found", { status: 401 });
  }

  const incomingClaims = decodeJwt(cfJWT);

  const jwtPayload = {
    sub: incomingClaims.sub,
    email: incomingClaims.email,
    iat: Math.floor(Date.now() / 1000),
  };

  const key = context.env.ZERO_AUTH_SECRET;
  const jwt = await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30days")
    .sign(new TextEncoder().encode(must(key)));

  return new Response("yay", {
    headers: {
      "Set-Cookie": cookie.serialize("jwt", jwt, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        path: "/",
      }),
    },
  });
};
