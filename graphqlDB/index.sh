#!/bin/bash

set -e

GRAPHQL_DB_USER=${GRAPHQL_DB_USER:-graphql}
GRAPHQL_DB_PASSWORD=${GRAPHQL_DB_PASSWORD:-password}
GRAPHQL_DB_DATABASE=${GRAPHQL_DB_DATABASE:-graphql}

psql --username $POSTGRES_USER \
  --set=username=$GRAPHQL_DB_USER \
  --set=userpassword=$GRAPHQL_DB_PASSWORD \
  --set=databasename=$GRAPHQL_DB_DATABASE \
  -f ~/sql/01_create.sql

psql --username $GRAPHQL_DB_USER $GRAPHQL_DB_DATABASE \
  -f ~/sql/02_up.sql
