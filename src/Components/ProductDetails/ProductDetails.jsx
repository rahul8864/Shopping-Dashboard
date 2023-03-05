import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./productdetails.module.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetails() {
  const [list, setList] = useState();
  const animations = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  };
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      // .then(res => res.json())
      .then((data) => setList(data?.data));
  }, []);


  const handleCart = (data) => {
    // const already = JSON.parse(localStorage.getItem('cart'))
    // const add = [...already, data]
    localStorage.setItem('cart', JSON.stringify(data))
  }

  return (
    <motion.div
      className="container-fluid"
      style={{ maxWidth: "85%", marginTop: "30px", marginBottom: "30px" }}
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6 }}
    >
      <div className={`${styles.card} card`}>
        <Link className={styles.back} to='/products'>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className={styles.details}>
          <div className={styles.bigImg}>
            <img src={list?.image} alt="" />
          </div>
          <div className={styles.box}>
          <div className={styles.boxInside}>
            <span className={styles.title}>{list?.title}</span>
            <span className={styles.category}>{list?.category}</span>
            <span className={styles.rate}>
              <i className="fa-solid fa-star text-warning me-1"></i>
              <span className="ml-2">{`${list?.rating?.rate} (${list?.rating?.count})`}</span>
            </span>
            <span className={styles.description}>{list?.description}</span>
          </div>
            {/* <button className={`${styles.cart} btn btn-outline-danger`}>+ Add to Cart</button> */}
          <div className={`${styles.buttonAdd}`}>
            <button className={`${styles.cart} btn btn-outline-danger`} onClick={() => handleCart(list)}>+ Add to Cart</button>
            <button className={`${styles.buy} btn btn-outline-primary`}>Buy Now</button>
          </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
