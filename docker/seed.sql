DROP TABLE IF EXISTS "user", "medium", "message", "location", "task", "log";

CREATE DATABASE zstart_solid;
CREATE DATABASE zstart_solid_cvr;
CREATE DATABASE zstart_solid_cdb;

\c zstart_solid;

CREATE TABLE "user" (
  "id" VARCHAR PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "location" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "task" (
  "id" text PRIMARY KEY,
  "title" text NOT NULL,
  "responsibleID" VARCHAR REFERENCES "user"(id) NULL,
  "dueDate" TIMESTAMP NOT NULL,
  "intervalSeconds" INT NULL,
  "description" text NULL,
  "locationID" text REFERENCES "location"(id) NULL
);

CREATE TABLE "log" (
  "id" text PRIMARY KEY,
  "taskID" text REFERENCES "task"(id),
  "completedAt" TIMESTAMP NOT NULL,
  "completedByID" VARCHAR REFERENCES "user"(id) NULL,
  "completionTimeMinutes" INT NOT NULL,
  "comment" text NULL
);

INSERT INTO "user" (id, name) VALUES ('ycD76wW4R2', 'Mikael');
INSERT INTO "user" (id, name) VALUES ('IoQSaxeVO5', 'Hannah');

INSERT INTO "location" (id, name) VALUES ('loc1', 'Kitchen');
INSERT INTO "location" (id, name) VALUES ('loc2', 'Living room');
INSERT INTO "location" (id, name) VALUES ('loc3', 'Bathroom');

INSERT INTO "task" (id, title, "intervalSeconds", "responsibleID", "dueDate", "locationID") VALUES ('task1', 'Clean fridge', 259200, 'ycD76wW4R2', '2021-01-01', 'loc1');
INSERT INTO "task" (id, title, "intervalSeconds", "responsibleID", "dueDate", "locationID") VALUES ('task2', 'Wash windows', 1209600, 'IoQSaxeVO5', '2021-01-02', 'loc2');

INSERT INTO "log" ("id", "taskID", "completedAt", "completedByID", "completionTimeMinutes", comment) VALUES ('log1', 'task1', '2021-01-01', 'ycD76wW4R2', 60, 'Fridge was very dirty');
INSERT INTO "log" ("id", "taskID", "completedAt", "completedByID", "completionTimeMinutes", comment) VALUES ('log2', 'task2', '2021-01-02', 'IoQSaxeVO5', 30, 'Two windows were dirty, rest were fine');
