import { useState, useEffect, useContext } from "react";
import Pagination from "@mui/material/Pagination";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";

function PaginationComponent({ productDetails, addCart, search, searchValue }) {
  const [page, setPage] = useState(1);
  const [productsLimits, setProductsLimits] = useState([]);
  const { limit, products, totalPages, setTotalPages } =
    useContext(ProductContext);
  useEffect(() => {
    setPage(1);
  }, [searchValue]);
  useEffect(() => {
    getProducts(page);
  }, [page, search]);
  function getProducts(page) {
    const skip = (page - 1) * limit;

    const data = products.slice(skip, skip + limit);
    console.log(data);
    console.log(search);

    if (searchValue) {
      if (search.length > 0) {
        setTotalPages(Math.ceil(search.length / limit));
        const paginatedSearch = search.slice(skip, skip + limit);
        setProductsLimits(paginatedSearch);
      } else {
        setProductsLimits([]);
      }
    } else {
      setTotalPages(Math.ceil(products.length / limit));
      setProductsLimits(data);
    }
    console.log(totalPages);
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <div className="container ">
        <div className="row">
          {productsLimits.map((product) => (
            <ProductCard
              product={product}
              productDetails={productDetails}
              addCart={addCart}
              key={product.id}
            />
          ))}
        </div>
      </div>

      <div className="container m-5 d-flex justify-content-center">
        <Pagination
          page={page}
          count={totalPages}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "dark",
              borderColor: "black",
              "&.Mui-selected": {
                backgroundColor: "#26150c",
                color: "#fff",
              },
              "&:hover": {
                backgroundColor: "#a29085",
                color: "#fff",
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default PaginationComponent;
