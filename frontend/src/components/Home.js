import React, { Fragment, useState,useEffect } from "react";
import MetaData from './layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layout/Loader';
import {useAlert} from 'react-alert';
import Pagination from 'react-js-pagination';
const Home = ({match}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

  const keyword = match.params.keyword
console.log(keyword);
  useEffect(() => {
      if (error) {
          return alert.error(error)
      }

      dispatch(getProducts(keyword, currentPage));


  }, [dispatch, alert, error, keyword, currentPage])

  function setCurrentPageNo(pageNumber) {
      setCurrentPage(pageNumber)
  }

  let count = productsCount;
  if (keyword) {
      count = filteredProductsCount
  }

  return (
    <Fragment>
    {loading ? <Loader /> : (
      <Fragment>
      <MetaData title={'Home-Buy best one'} />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
        {products && products.map(product => (
         <Product key={ product._id } product = { product } />
        ))}
          
        </div>
      </section>
      <div className="d-flex justify-content-center mt-5">
        {resPerPage < productsCount && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass="page-item"
            linkClass="page-link"
        />
        )}
        
      </div>
    </Fragment>
    )}
    </Fragment>
    
  );
}

export default Home;
