function ProductCard({ product, productDetails, addCart }) {
  return (
    <>
      <div className="col-md-3 my-3">
        <div className="card h-100 shadow border-0 ">
          <img
            src={product.image}
            className="card-img-top img-fluid"
            alt={product.title}
            style={{
              height: "300px",
              objectFit: "contain",
            }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              {product.title.split(" ").slice(0, 3).join(" ")}
            </h5>

            <p className="fw-bold">Price: ${product.price.toFixed(2)}</p>
            <div className="d-flex justify-content-between">
              <button
                onClick={() => productDetails(product.id)}
                className="btn btn-primary"
              >
                details
              </button>
              <button
                onClick={() => addCart(product.id)}
                className="btn btn-danger"
              >
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
