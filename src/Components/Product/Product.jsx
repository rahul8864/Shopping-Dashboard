import React from 'react'
import styles from './product.module.scss'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from 'axios';

export default function Product() {
  const [list, setList] = useState([])
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      // .then(res => res.json())
      .then((data) => setList(data?.data));
  }, []);
  const options = {
    loop: true,
    items: 5,
    margin: 15,
    center: true,
    autoplay: true,
    dots: false,
    navText:[
      '<span class="arrow prev">‹</span>',
      '<span class="arrow next">›</span>'
    ]
  };

  return (
    <>
        <div className={styles.product}>
            <div className={styles.top}>
                <span className={styles.deals}><span className={styles.dealText}>Today's Deals </span><Link to='/products'>see all products</Link></span>
                <span className={styles.heading}>rotating product list</span>
            </div>
            <div className={styles.cards}>
            {list.length > 0 &&
              <OwlCarousel className="owl-carousel owl-theme" {...options}>
              {list?.map((item, index) => (
              <Link to={`/products/${item.id}`} className={`${styles.mainContainer} item`} key={index}>
                <div className={styles.image}>
                  <img src={item.image}/>
                </div>
                <div className={styles.title}>
                  <div className={styles.offer}>
                    <span className={styles.upto}>Upto 70% off</span>
                    <span className={styles.best}>Best of the Day</span>
                  </div>
                  <span className={styles.text}>{item.title?.length > 20 ? `${item.title?.slice(0,25)}...` : item.title}</span>
                </div>
              </Link>
              ))}
            </OwlCarousel>
            }
            </div>
        </div>
    </>
  )
}
