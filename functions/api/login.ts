import { PagesFunction } from "@cloudflare/workers-types";
import { SignJWT, decodeJwt } from "jose";
import * as cookie from "cookie";
import { PostgresUserRepository } from "../../src/lib/users";
import { getIdentityTraits } from "../../src/lib/users/oidc";

interface Env {
  ZERO_AUTH_SECRET: string;
  ZERO_UPSTREAM_DB: string;
  CF_USER_IDENTITY_ENDPOINT: string;
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

  // claims that we get from cloudflare
  const traits = decodeJwt(cfJWT);
  const sub = traits.sub as string;
  const email = traits.email as string;

  // have we registered this user? If not, we'll fetch details from
  //
  const repo = new PostgresUserRepository(context.env.ZERO_UPSTREAM_DB);
  if ((await repo.get(sub)) == null) {
    console.log("user does not exist - creating");
    const res = await getIdentityTraits(
      context.env.CF_USER_IDENTITY_ENDPOINT,
      `CF_Authorization=${cfJWT}`,
    );
    await repo.create({
      id: sub,
      name: res.name,
      email: res.email,
      avatar: res.oidc_fields.picture,
    });
    console.log("user created");
  } else {
    console.log("user already exists");
  }

  const jwtPayload = {
    sub,
    email,
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
