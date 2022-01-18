import { createConnection } from "mysql";
import { promisify } from "util";
import { config } from "dotenv";

config(".env");
const log = (s) => console.log(s);
const con = createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

init();
async function init() {
  const { err } = await promisify(con.connect);
  if (err) throw err;
  log("Connected!");

  log(await search(""));
  con.end();
}
async function addUsers(name, email) {
  return await query(`
    insert into users(name,email)
    values('${name}','${email}');
    `);
}
async function addProducts(name, dec, price, manufacturer) {
  return await query(
      `insert into products(name,description,price,manufacturer)
      values('${name}','${dec}',${price},${manufacturer});`
  );
}
async function search(str) {
  const results = await query(
    `select products.name,price,users.name as manufacturer from products 
    inner join users on users.id = products.manufacturer 
    where products.name like '%${str}%';`
  );
  return results;
}
async function query(str) {
  const res = await promisify(con.query).bind(con)(str);
  if (res.error) throw res.error;
  return res;
}
