# node-task-one

psql -h localhost -p 5432 -U user -d postgres -f init_schema.sql
psql -h localhost -p 5432 -U user -d postgres -f seed_shop.sql
