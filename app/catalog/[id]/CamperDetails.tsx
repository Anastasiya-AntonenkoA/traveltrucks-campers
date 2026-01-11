"use client";

import { useState } from "react";
import Image from "next/image";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { Camper } from "@/lib/api";
import css from "./CamperDetails.module.css";

import BookForm from "@/components/BookForm/BookForm";
import Features from "@/components/Features/Features";
import Reviews from "@/components/Reviews/Reviews";

interface Props {
  item: Camper;
}

const CamperDetails = ({ item }: Props) => {
    const [activeTab, setActiveTab] = useState<"features" | "reviews">("features");
    const [index, setIndex] = useState(-1)

    if (!item) return null;
    
    const slides = item.gallery?.map((img) => ({src: img.original,})) || [];

  return (
    <section className={css.container}>
      {/* інформація про кемпер */}
      <div className={css.headerSection}>
        <h2 className={css.name}>{item.name}</h2>
        <div className={css.metaInfo}>
          <div className={css.ratingWrapper}>
            <svg width="16" height="16" style={{ fill: "#FFC531" }}>
              <use href="/icons/sprite.svg#icon-star" />
            </svg>
            <span className={css.ratingText}>
              {item.rating} ({item.reviews?.length || 0} Reviews)
            </span>
          </div>
          <div className={css.locationWrapper}>
            <svg width="16" height="16">
              <use href="/icons/sprite.svg#icon-map" />
            </svg>
            <span>{item.location}</span>
          </div>
        </div>
        <p className={css.price}>€{Number(item.price).toFixed(2)}</p>
      </div>

      {/* галерея фото */}
      <ul className={css.gallery}>
        {item.gallery?.map((img, idx) => (
          <li 
            key={idx} 
            className={css.imageItem}
            onClick={() => setIndex(idx)}
          >
            <Image
              src={img.original}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className={css.image}
            />
          </li>
        ))}
      </ul>
          
       <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
      />

      {/* опис */}
      <p className={css.description}>{item.description}</p>

      {/* навігація */}
      <div className={css.tabsHeader}>
        <button
          type="button"
          className={`${css.tab} ${activeTab === "features" ? css.active : ""}`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          type="button"
          className={`${css.tab} ${activeTab === "reviews" ? css.active : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* компоненти + Форма) */}
      <div className={css.bottomLayout}>
        <div className={`${css.contentColumn} ${activeTab === "features" ? css.grayBackground : ""}`}>
            {activeTab === "features" ? (
                <Features item={item} />
            ) : (
                <Reviews reviews={item.reviews} />
            )}
            </div>

        <div className={css.formColumn}>
          <BookForm />
        </div>
      </div>
    </section>
  );
};

export default CamperDetails;