import postgres from "postgres";

type UserRow = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export class PostgresUserRepository {
  private sql: postgres.Sql;

  constructor(dsn: string) {
    this.sql = postgres(dsn);
  }

  async get(id: string): Promise<UserRow | null> {
    const res = await this.sql`select * from "user" where id = ${id}`;
    if (res.length > 0) {
      return res[0] as UserRow;
    }
    return null;
  }

  async create({ id, name, email, avatar }: UserRow) {
    await this
      .sql`insert into "user" (id, name, email, avatar) values (${id}, ${name}, ${email}, ${avatar})`;
  }

  async delete(id: string) {
    await this.sql`delete from "user" where id = ${id}`;
  }
}
