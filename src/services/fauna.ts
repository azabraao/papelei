import { Client } from "faunadb";

export const fauna = new Client({
  secret: process.env.FAUNA_DB_KEY,
  domain: "db.us.fauna.com",
  port: 443,
  scheme: "https",
});

console.log("fauna>>>", process.env.FAUNA_DB_KEY);
