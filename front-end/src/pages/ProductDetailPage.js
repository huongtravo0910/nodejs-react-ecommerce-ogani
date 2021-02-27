import React, { useEffect } from "react";
import { Hero } from "../components/Hero";
import ProductDetails from "../components/Product";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productAction";

export default function ProductDetailPage(props) {
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
  }, []);

  return (
    <div>
      <Hero />
      <ProductDetails
        image={product.image}
        title={product.name}
        price={product.price}
        numReviews={product.numReviews}
        description={product.description}
      />
    </div>
  );
}

