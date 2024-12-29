DROP TABLE IF EXISTS "user", "medium", "message", "location", "task", "log";

CREATE DATABASE zstart_solid;
CREATE DATABASE zstart_solid_cvr;
CREATE DATABASE zstart_solid_cdb;

\c zstart_solid;

CREATE TABLE "user" (
  "id" VARCHAR PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "avatar" text NOT NULL
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

INSERT INTO "user" (id, email, name, avatar) VALUES ('xxycD76wW4R2', 'mikael@email.com', 'Mikael', 'https://lh3.googleusercontent.com/a-/ALV-UjXxZNbl_kyOdzu4vuZ_CNJb6o6o0uOVbmLUgy83Z--WkisfEwhUQ58JkHwdudzfft6ii4IqPlvU4bp0YslIdP9Umey__iOCBu01eUSO4tVMlcOlCHZ_pxWpEmB7J1tnpQ5KhRtqyarM2Cng1nA-WpVUWDUwdhSncfHAsU5kmfalrn_FmNVJ7DAbgqqMiLJYUV_q-7Of01CWJhCn7NHoccv5u2f-h9AOi9VW0fhQN0TNI9DJmfGd68YeL6EScWYmmKVCcscsMkGp3XqwGu7aIrr8m1FoDUO-aK6I7HyLdIoF1OBEiKq6e1KArGhEf_jRqvfhnK15ucftWCsyx1UMd1XOnwEKzd4xY8eH2IKVEDorNpLczWJJa3lYTu-_kTpHuR1ZZSM0ltmQkqAcewdbZmKxHXWmKTuGup6ca7XmW3_j5yMY98USBfBSHR_zhhMTyv_yEp_J2WN6HxrCf83lBVuPhh8Iuv5hM6YulgNOkhYwEJGBfcbR05PY6E0xFbx95mqd1JbEOxg8l9LHggQlLlwF-SCKW0B-jXYs8FRmwjnU34JJIvuE4FyujFZCc2q_5B_9i2vmAq1nvkq68Zs-rttwHDv9qNJAvosNxNxB9smyJorB1GpAoHNNZwZWsKyy5jJfb-lddS2_kS6vFfCOhA2mK0fuP9slKR4z14NbYx7UeRsi7TTfbNeF05Z0Qsi1UU687SG_PA0m3IR1AmHz5JpM2cNdHfQRfGIOZr6SKeNN8opyUNdEHxBhp49-XOTNVyvl9UrPOU7FbWG8H7DqA6epHBRSvHWrS2I5ulySz-R0C60uOsAedIsLehDTMWA3x4kKJhoKtLTfO00Z3Z3p4nuhkhXFWFsMK8rt0gvDVKBTf1arBRSPWd7o2c43qGaHXlUtn0JnYvvBHOtTdeISotXYhkBxTwXUSLwZz0Mb_Ub3-sFv0Ur0SxjsMW5L6rGgb1ROZuxguAI8k0JKBcHJXgH50a0h=s96-c');
INSERT INTO "user" (id, email, name, avatar) VALUES ('IoQSaxeVO5', 'hannah@email.com', 'Hannah', 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U');

INSERT INTO "location" (id, name) VALUES ('loc1', 'Kitchen');
INSERT INTO "location" (id, name) VALUES ('loc2', 'Living room');
INSERT INTO "location" (id, name) VALUES ('loc3', 'Bathroom');

-- fHV3Qkdl1F
INSERT INTO "task" (id, title, "intervalSeconds", "responsibleID", "dueDate", "locationID") VALUES ('fHV3Qkdl1F', 'Clean fridge', 259200, 'xxycD76wW4R2', now() + interval '1 day' , 'loc1');
-- 2MENyJqrNY
CREATE TABLE "log" (
  "id" text PRIMARY KEY,
  "taskID" text REFERENCES "task"(id),
  "completedAt" TIMESTAMP NOT NULL,
  "completedByID" VARCHAR REFERENCES "user"(id) NULL,
  "completionTimeMinutes" INT NOT NULL,
  "comment" text NULL
);

INSERT INTO "task" (id, title, "intervalSeconds", "responsibleID", "dueDate", "locationID") VALUES ('2MENyJqrNY', 'Wash windows', 1209600, 'IoQSaxeVO5',now() + interval '13 day', 'loc2');

INSERT INTO "log" ("id", "taskID", "completedAt", "completedByID", "completionTimeMinutes", comment) VALUES ('log1', 'fHV3Qkdl1F', now() - interval '3 day', 'xxycD76wW4R2', 60, 'I ate everything in the fridge');
INSERT INTO "log" ("id", "taskID", "completedAt", "completedByID", "completionTimeMinutes", comment) VALUES ('log2', '2MENyJqrNY', now() - interval '1 day', 'IoQSaxeVO5', 30, 'Two windows were dirty, rest were fine');
