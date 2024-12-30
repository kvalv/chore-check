// there are more fields, this is just the subset we care about
type IdentityTraits = {
  id: string;
  name: string;
  email: string;
  oidc_fields: {
    picture: string;
  };
  // ...
};

/**
 * Fetches traits that is not available in the JWT token.
 *
 * See https://developers.cloudflare.com/cloudflare-one/identity/authorization-cookie/application-token/#user-identity.
 *
 * @example:
 * getIdentityTraits("https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/get-identity", "CF_Authorization=<user-token>")
 */
export async function getIdentityTraits(
  identityEndpoint: string,
  cookie: string,
): Promise<IdentityTraits> {
  if (!cookie.toLowerCase().startsWith("cf_authorization=")) {
    throw new Error("Expected CF_Authorization cookie");
  }
  const res = await fetch(identityEndpoint, { headers: { cookie } });
  console.log(`identity endpoint: inner - got response ${JSON.stringify(res)}`);

  if (!res.ok) {
    throw new Error("Failed to fetch identity traits");
  }

  return await res.json();
}
