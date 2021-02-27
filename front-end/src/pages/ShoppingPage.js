import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ProductCard } from "../components/Product";
import { Hero } from "../components/Hero";
import Breadcrumb from "../components/Breadcrumb";

import { listCategory } from "../actions/categoryAction";
import { listProduct } from "../actions/productAction";

export default function ShoppingPage(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("Shopping");
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const categories = categoryList.categories.categories;
  const categoryLoading = categoryList.loading;
  const categoryError = categoryList.error;
  useEffect(() => {
    dispatch(listCategory());
  }, []);

  useEffect(() => {
    dispatch(listProduct());
  }, []);

  useEffect(() => {
    dispatch(listProduct(categoryId, searchKeyword, sortOrder));
  }, [categoryId, searchKeyword, sortOrder]);
  // console.log(categories);
  // console.log(Array.isArray(categories));
  // console.log(products);

  const searchSubmitHandler = (searchKeyword) => {
    setSearchKeyword(searchKeyword);
    console.log("Hello");
    console.log(searchKeyword);
  };
  const sortLowestHandler = () => {
    setSortOrder("lowest");
    // console.log("sortOrders" + sortOrder);
    // dispatch(listProduct("", searchKeyword, sortOrder));
    // console.log("lowest");
  };

  const sortHighestHandler = () => {
    setSortOrder("highest");
    // dispatch(listProduct("", searchKeyword, sortOrder));
  };

  const sortOrderOnchangeHandler = (e) => {
    setSortOrder(e.target.value);
    // dispatch(listProduct("", searchKeyword, sortOrder));
  };

  // console.log("render");
  // console.log(products.map(product => product.price));

  return (
    <div>
      <Hero submitHandler={searchSubmitHandler} />
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5">
              {/* Side bar */}
              <div className="sidebar">
                <div className="sidebar__item">
                  <h4>Department</h4>
                  {categoryLoading ? (
                    <div>Loading...</div>
                  ) : categoryError ? (
                    <div>{categoryError}</div>
                  ) : (
                    <ul>
                      {categories &&
                        categories.map((category) => (
                          <li
                            key={category._id}
                            onClick={() => {
                              setCategoryId(category._id);
                              setTitle(category.name);
                            }}
                          >
                            <a href="#">{category.name}</a>
                            <input type="hidden" value={category._id} />
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
                <div className="sidebar__item">
                  <h4>Price</h4>
                  <div className="price-range-wrap">
                    <div
                      className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                      data-min="10"
                      data-max="540"
                    >
                      <div className="ui-slider-range ui-corner-all ui-widget-header"></div>
                      <span
                        tabIndex="0"
                        className="ui-slider-handle ui-corner-all ui-state-default"
                      ></span>
                      <span
                        tabIndex="0"
                        className="ui-slider-handle ui-corner-all ui-state-default"
                      ></span>
                    </div>
                    <div className="range-slider">
                      <div className="price-input">
                        <input type="text" id="minamount" />
                        <input type="text" id="maxamount" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sidebar__item">
                  <h4>Sort by</h4>
                  <div className="sidebar__item__size">
                    <button onClick={sortLowestHandler}>lowest</button>
                  </div>
                  <div className="sidebar__item__size">
                    <button onClick={sortHighestHandler}>Highest</button>
                  </div>
                </div>{" "}
              </div>
              {/* End ofSide bar */}
            </div>

            <div className="col-lg-9 col-md-7">
              <div className="product__discount">
                <div className="section-title product__discount__title">
                  <h2>{title}</h2>
                </div>

                <div className="filter__item">
                  <div className="row">
                    <div className="col-lg-4 col-md-5">
                      <div className="filter__sort">
                        <span>Sort By</span>
                        <select onChange={sortOrderOnchangeHandler}>
                          <option value="lowest">Low to High</option>
                          <option value="highest">High to Low</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="filter__found">
                        <h6>
                          <span>16</span> Products found
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-3">
                      <div className="filter__option">
                        <span className="icon_grid-2x2"></span>
                        <span className="icon_ul"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {products &&
                    products.map((product) => (
                      <ProductCard
                        key={product._id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        id={product._id}
                      />
                    ))}
                </div>
                <div className="row">
                  <div className="product__pagination">
                    <a href="#">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">-></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
