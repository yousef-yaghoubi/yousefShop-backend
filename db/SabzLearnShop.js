const mysql = require("mysql");

//const SabzlearnShopDB = mysql.createConnection({
//  host: "127.0.0.1",
//  user: "root",
//  password: "",
//  database: "shopDB",
//});

// const SabzlearnShopDB = mysql.createConnection({
//  host: "sql12.freesqldatabase.com",
//  user: "sql12717913",
//  password: "XDfQQMzNEg",
//  database: "sql12717913",
// });

// const SabzlearnShopDB = mysql.createConnection({
//    host: "yousefshopdb",
//    user: "root",
//    password: "uVfORHmFSyhdznzLU1PI2PEi",
//    database: "sleepy_galileo",
//    port: "3306"
// });


const SabzlearnShopDB = mysql.createConnection({
   host: "bromo.liara.cloud",
   user: "root",
   password: "QsoMBa553Ho2rm4JjLvvpe6V",
   database: "interesting_ardinghelli",
   port: "31489"
});


//const SabzlearnShopDB = mysql.createConnection({
//   host: "sql111.infinityfree.com",
//   user: "if0_36839542",
//   password: "q24NNzH8Gm6t1",
//   database: "if0_36839542_yousefdb",
// });
module.exports = SabzlearnShopDB;
