CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "e_mail" varchar(100) NOT NULL,
    "full_name" varchar(100) NOT NULL,
    "password" varchar(100) NOT NULL,
    "role": VARCHAR(20) NOT NULL
);

CREATE TABLE "session" (
  "id" SERIAL PRIMARY KEY,
  "id_user" INTEGER NOT NULL REFERENCES "user" ("id"),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "test" (
  "id" SERIAL PRIMARY KEY,
  "id_user" INTEGER NOT NULL REFERENCES "user" ("id"),
  "execution_time" time(),
  "number_of_attempts" INTEGER
);

CREATE TABLE "result" (
  "id" SERIAL PRIMARY KEY,
  "id_test" INTEGER NOT NULL REFERENCES "test" ("id"),
  "id_user" INTEGER NOT NULL REFERENCES "user" ("id"),
  "point" INTEGER,
  "data" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "ticket" (
  "id" SERIAL PRIMARY KEY,
  "id_test" INTEGER NOT NULL REFERENCES "test" ("id"),
  "number" INTEGER
);

CREATE TABLE "question" (
  "id" SERIAL PRIMARY KEY,
  "id_ticket" INTEGER,
  "number" INTEGER
);

CREATE TABLE "anwer" (
  "id" SERIAL PRIMARY KEY,
  "id_question" INTEGER NOT NULL REFERENCES "question" ("id"),
  "is_valid" BOOLEAN
);
