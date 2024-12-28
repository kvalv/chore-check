// These data structures define your client-side schema.
// They must be equal to or a subset of the server-side schema.
// Note the "relationships" field, which defines first-class
// relationships between tables.
// See https://github.com/rocicorp/mono/blob/main/apps/zbugs/src/domain/schema.ts
// for more complex examples, including many-to-many.

import {
  createSchema,
  createTableSchema,
  definePermissions,
  ExpressionBuilder,
  TableSchema,
  Row,
  ANYONE_CAN,
  NOBODY_CAN,
} from "@rocicorp/zero";

const userSchema = createTableSchema({
  tableName: "user",
  columns: {
    id: "string",
    name: "string",
    partner: "boolean",
  },
  primaryKey: "id",
});

const locationSchema = createTableSchema({
  tableName: "location",
  columns: {
    id: "string",
    name: "string",
  },
  primaryKey: "id",
});

// logschema is not yet defined, so we use a lazy version to set up
// relationship in taskSchema to log
const logSchemaType = createTableSchema({
  tableName: "log",
  columns: {
    id: "string",
    taskID: "string",
    completedAt: "number",
    completedByID: "string",
    completionTimeMinutes: "number",
    comment: { type: "string", optional: true },
  },
  primaryKey: "id",
});

const lazyLogSchema = () => logSchema;

// const taskSchema: TableSchema = createTableSchema({
const taskSchema = createTableSchema({
  tableName: "task",
  columns: {
    id: "string",
    title: "string",
    intervalSeconds: { type: "number", optional: true },
    description: { type: "string", optional: true },
    responsibleID: "string",
    dueDate: "number",
    locationID: "string",
  },
  primaryKey: "id",
  relationships: {
    log: {
      destSchema: logSchemaType,
      sourceField: "id",
      destField: "taskID",
    },
    responsible: {
      sourceField: "responsibleID",
      destSchema: userSchema,
      destField: "id",
    },
    location: {
      sourceField: "locationID",
      destSchema: locationSchema,
      destField: "id",
    },
  },
});

// taskdi, completedat, completedbyid, completiontimeminutes, comment
const logSchema = createTableSchema({
  tableName: "log",
  columns: {
    id: "string",
    taskID: "string",
    completedAt: "number",
    completedByID: "string",
    completionTimeMinutes: "number",
    comment: { type: "string", optional: true },
  },
  primaryKey: "id",
  relationships: {
    task: {
      sourceField: "taskID",
      destSchema: taskSchema,
      destField: "id",
    },
    completedBy: {
      sourceField: "completedByID",
      destSchema: userSchema,
      destField: "id",
    },
  },
});
export const schema = createSchema({
  version: 1,
  tables: {
    user: userSchema,
    location: locationSchema,
    task: taskSchema,
    log: logSchema,
  },
});

export type User = Row<typeof userSchema>;
export type Location = Row<typeof locationSchema>;
export type Log = Row<typeof logSchema>;
export type Task = Row<typeof taskSchema>;

export type Schema = typeof schema;

// The contents of your decoded JWT.
type AuthData = {
  sub: string | null;
};

const policies = {
  log: {
    validCreatorID: (
      auth: AuthData,
      { cmp }: ExpressionBuilder<typeof logSchema>,
    ) => {
      return cmp("completedByID", "=", auth.sub ?? "todo");
    },
  },
};

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
  const allowIfLoggedIn = (
    authData: AuthData,
    { cmpLit }: ExpressionBuilder<TableSchema>,
  ) => cmpLit(authData.sub, "IS NOT", null);

  return {
    user: {
      row: {
        insert: NOBODY_CAN,
        update: {
          preMutation: NOBODY_CAN,
        },
        delete: NOBODY_CAN,
      },
    },
    location: {
      row: {
        insert: NOBODY_CAN,
        update: {
          preMutation: NOBODY_CAN,
        },
        delete: NOBODY_CAN,
      },
    },
    task: {
      row: {
        insert: ANYONE_CAN,
        // only sender can edit their own messages
        update: {
          // preMutation: [allowIfMessageSender],
        },
        // must be logged in to delete
        delete: [allowIfLoggedIn],
      },
    },
    log: {
      row: {
        insert: [policies.log.validCreatorID],
        update: {
          preMutation: NOBODY_CAN,
        },
        delete: NOBODY_CAN,
      },
    },
  };
});

export default {
  schema,
  permissions,
};
