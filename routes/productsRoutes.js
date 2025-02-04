const express = require("express");
const SabzlearnShopDB = require("./../db/SabzLearnShop");

const productsRouter = express.Router();

// routes

productsRouter.get("/", (req, res) => {
  console.log('get products');
  let selectAllProductsQuery = `SELECT * FROM products`;
  SabzlearnShopDB.query(selectAllProductsQuery, (err, result) => {
    console.log('get products query');
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      console.log('get products query result');
      res.send(result);
    }
  });
});

// productsRouter.get('/', (req, res) => {
//   const limit = parseInt(req.query.limit) || 10;  // Number of products to fetch per request
//   const offset = parseInt(req.query.offset) || 0; // Offset for pagination

//   const query = `SELECT * FROM products LIMIT ${limit} OFFSET ${offset}`;
//   SabzlearnShopDB.query(query, [limit, offset], (err, results) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.json(results);
//   });
// });


productsRouter.get("/q=:query", (req, res) => {
  let query = req.params.query;

  let selectAllProductsQuery = `SELECT * FROM products WHERE title LIKE '%${query}%'`;
  SabzlearnShopDB.query(selectAllProductsQuery, (err, result) => {
    console.log('get products query');
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      console.log('get products query result');
      res.send(result);
    }
  });
});

productsRouter.get("/category:categoryID/filter:filterC/from:priceA/to:priceB/q=:querySearch", (req, res) => {
  let priceA = req.params.priceA;
  let priceB = req.params.priceB;
  let filterC = req.params.filterC;
  let categoryID = req.params.categoryID;
  let querySearch = req.params.querySearch;
  console.log('get products');

  let selectAllProductsQuery = `SELECT * FROM products WHERE price > ${priceA} && price < ${priceB}  && title LIKE '%${querySearch}%' ${categoryID == 0 ? '' : `&& categoryID = ${categoryID}`} ORDER BY products.${filterC == 1 ? 'sale' : filterC == 2 || filterC == 3 ? 'price' : ''} ${filterC == 1 ? 'DESC' : filterC == 2 ? 'ASC' : filterC == 3 ? 'DESC' : ''}`;
  SabzlearnShopDB.query(selectAllProductsQuery, (err, result) => {
    console.log('get products query');
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      console.log('get products query result');
      res.send(result);
    }
  });
});

productsRouter.get("/category:categoryID/filter:filterC/from:priceA/to:priceB", (req, res) => {
  let priceA = req.params.priceA;
  let priceB = req.params.priceB;
  let filterC = req.params.filterC;
  let categoryID = req.params.categoryID;
  console.log('get products');

  let selectAllProductsQuery = `SELECT * FROM products WHERE price > ${priceA} && price < ${priceB} ${categoryID == 0 ? '' : `&& categoryID = ${categoryID}`} ORDER BY products.${filterC == 1 ? 'sale' : filterC == 2 || filterC == 3 ? 'price' : ''} ${filterC == 1 ? 'DESC' : filterC == 2 ? 'ASC' : filterC == 3 ? 'DESC' : ''}`;
  SabzlearnShopDB.query(selectAllProductsQuery, (err, result) => {
    console.log('get products query');
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      console.log('get products query result');
      res.send(result);
    }
  });
});

productsRouter.get("/filter:filterC", (req, res) => {
  let filterC = req.params.filterC;
  console.log('get products');
  let selectAllProductsQuery = `SELECT * FROM products ORDER BY products.${filterC == 1 ? 'sale' : filterC == 2 || filterC == 3 ? 'price' : ''} ${filterC == 1 ? 'DESC' : filterC == 2 ? 'ASC' : filterC == 3 ? 'DESC' : ''};`;
  SabzlearnShopDB.query(selectAllProductsQuery, (err, result) => {
    console.log('get products query');
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      console.log('get products query result');
      res.send(result);
    }
  });
});

productsRouter.delete("/:productID", (req, res) => {
  let productID = req.params.productID;
  let deleteProductQuery = `DELETE FROM products WHERE id = ${productID}`;

  SabzlearnShopDB.query(deleteProductQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

productsRouter.put("/:productID", (req, res) => {
  let body = req.body;
  let productID = req.params.productID;

  let updateProductQuery = `UPDATE products SET title="${body.title}", price=${body.price}, count=${body.count} ,img="${body.img}",popularity=${body.popularity},sale=${body.sale},colors=${body.colors} WHERE id = ${productID}`;
  SabzlearnShopDB.query(updateProductQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

productsRouter.post("/", (req, res) => {
  let body = req.body;
  // let id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  // let addNewProductQuery = `INSERT INTO Products VALUES ("${body.title}", ${body.price}, ${body.count}, "${body.img}", ${body.popularity}, ${body.sale}, ${body.colors}, "dd", "url", ${body.categoryID})`;
  let addNewProductQuery = `INSERT INTO products (title, price, count, img, popularity, sale, colors, productDesc, url, categoryID) VALUES ("${body.title}",${body.price},${body.count},"${body.img}",${body.popularity},${body.sale},${body.colors},"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم که طلبد،, سخت مورد ارائه فراوان می حال در. نرم افزارها با جامعه ساختگی دشواری طلبد، می حروفچینی سادگی می دنیای, این ایپسوم نیاز رایانه نامفهوم چاپ، فراوان تولید صورت. با داشت می دنیای موجود صنعت لورم در و شرایط دشواری اصلی، می, اهل ایپسوم نیاز، زبان سطرآنچنان فعلی خلاقی، است، در و. از اصلی، و از افزارها زبان طراحی برای کتابهای ایجاد استفاده, طراحان دشواری چاپ، تولید توان حال پایان ایپسوم روزنامه طلبد،, شناخت در فارسی ستون نامفهوم داشت پیشرو سوالات دنیای.","url",${body.categoryID})`
  
  SabzlearnShopDB.query(addNewProductQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      res.send(result);
    }
  });
});





module.exports = productsRouter;
