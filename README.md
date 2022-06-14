I'm using [Postman](https://www.postman.com/supply-pilot-47272947/workspace/proyecto-backend) for testing.
For personal use, set the local enviroment.
The project is deployed in [Glitch](https://glitch.com/edit/#!/back-project). For this use the glitch enviroment.

# /api/cart

- GET /:id/products: returns the products in the cart

- POST / create a new cart and return the cart id

- ~~PUT /:id update the cart~~ dont required

- DELETE /:id delete the cart

- DELETE /:id/products/:product_id: remove a product from the cart

# /api/products

- GET /:id? returns all products or one product

- POST / (admin only) post a new product

- PUT /:id (admin only) update a product

- DELETE /:id (admin only) delete a product
