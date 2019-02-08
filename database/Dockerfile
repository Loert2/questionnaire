FROM postgres:11.1

COPY ./sql /var/lib/postgresql/sql
COPY ./index.sh /docker-entrypoint-initdb.d/init.sh
