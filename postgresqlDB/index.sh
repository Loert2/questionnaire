#!/bin/bash

set -e

POSTGRESQL_DB_USER=${POSTGRESQL_DB_USER:-questionnaire}
POSTGRESQL_DB_PASSWORD=${POSTGRESQL_DB_PASSWORD:-password}
POSTGRESQL_DB_DATABASE=${POSTGRESQL_DB_DATABASE:-questionnaire}

psql --username $POSTGRES_USER \
  --set=username=$POSTGRESQL_DB_USER \
  --set=userpassword=$POSTGRESQL_DB_PASSWORD \
  --set=databasename=$POSTGRESQL_DB_DATABASE \
  -f ~/sql/01_create.sql

psql --username $POSTGRESQL_DB_USER $POSTGRESQL_DB_DATABASE \
  -f ~/sql/02_up.sql
  -f ~/sql/03_data.sql
