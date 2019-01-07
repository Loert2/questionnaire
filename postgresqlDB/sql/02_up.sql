CREATE TABLE "user" (
    "id_user" SERIAL PRIMARY KEY,
    "e_mail" varchar(100) NOT NULL,
    "full_name" varchar(100) NOT NULL,
    "password" varchar(100) NOT NULL,
    "role" VARCHAR(20) NULL
);

CREATE TABLE "session" (
  "id_session" SERIAL PRIMARY KEY,
  "id_user" INTEGER NOT NULL REFERENCES "user" ("id_user"),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "test" (
  "id_test" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "number_of_attempts" INTEGER NULL
);

CREATE TABLE "result" (
  "id_result" SERIAL PRIMARY KEY,
  "id_test" INTEGER NOT NULL REFERENCES "test" ("id_test"),
  "id_user" INTEGER NOT NULL REFERENCES "user" ("id_user"),
  "point" INTEGER NOT NULL,
  "data" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "ticket" (
  "id_ticket" SERIAL PRIMARY KEY,
  "id_test" INTEGER NOT NULL REFERENCES "test" ("id_test"),
  "number_of_question" INTEGER NOT NULL
);

CREATE TABLE "question" (
  "id_question" SERIAL PRIMARY KEY,
  "id_ticket" INTEGER NOT NULL REFERENCES "ticket" ("id_ticket"),
  "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "answer" (
  "id_answer" SERIAL PRIMARY KEY,
  "id_question" INTEGER NOT NULL REFERENCES "question" ("id_question"),
  "name" VARCHAR(255) NOT NULL,
  "is_valid" BOOLEAN NOT NULL
);

CREATE TABLE "answer_user" (
  "id_anwer_user" SERIAL PRIMARY KEY,
  "id_user" INTEGER NOT NULL REFERENCES "user" ("id_user"),
  "id_question" INTEGER NOT NULL REFERENCES "question" ("id_question"),
  "is_valid" BOOLEAN NOT NULL
);
