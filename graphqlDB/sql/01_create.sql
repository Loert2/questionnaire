CREATE DATABASE :databasename;

CREATE USER :username WITH CREATEDB PASSWORD ':userpassword';
GRANT ALL PRIVILEGES ON DATABASE :databasename TO :username;
