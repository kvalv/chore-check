import { describe, expect, test } from "vitest";
import { PostgresUserRepository } from ".";
import { randomUUID } from "crypto";
import { getIdentityTraits } from "./oidc";

describe("PostgresUserRepository", async () => {
  const dsn = import.meta.env.ZERO_UPSTREAM_DB;
  const repo = new PostgresUserRepository(dsn);

  test("create and delete user", async () => {
    const name = "test";
    const id = randomUUID();
    await repo.create({
      id,
      name,
      email: "test@basketballface.com",
      avatar: "https://basketballface.com/avatar.png",
    });
    const row = await repo.get(id);
    expect(row).not.toBe(null);
    expect(row!.id).toBe(id);

    await repo.delete(id);
    const deleted = await repo.get(id);
    expect(deleted).toBe(null);
  });
});

test("oidc", async (ctx) => {
  const cookie = "";
  // skip if empty -- only tested locally with a hardcoded cookie
  if (!cookie) {
    ctx.skip();
  }
  const got = await getIdentityTraits(
    import.meta.env.CF_USER_IDENTITY_ENDPOINT,
    cookie,
  );
  expect(got).toMatchObject({
    id: expect.any(String),
    name: expect.any(String),
    email: expect.any(String),
    oidc_fields: expect.objectContaining({
      picture: expect.any(String),
    }),
  });
});
