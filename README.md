# easy-cards-express

### Instructions to run

- On Mac: `DEBUG=myapp:* npm start`

- On Windows: `set DEBUG=myapp:*; npm start`

### Transfer prisma to .sql file

npx prisma migrate diff --from-empty --to-schema-datasource prisma/schema.prisma --script > prisma/generated.sql