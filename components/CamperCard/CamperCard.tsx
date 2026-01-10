"use client";

import Image from "next/image";
import { Camper } from "@/lib/api";
import css from "./CamperCard.module.css";

interface CamperCardProps {
  item: Camper;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const CamperCard = ({ 
  item, 
  isFavorite = false, 
  onToggleFavorite 
}: CamperCardProps) => {
  
  // обробник для кнопки уподобання
  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(item.id);
    }
  };
    
  const tags = [
    { key: "transmission", label: item.transmission.charAt(0).toUpperCase() + item.transmission.slice(1), icon: "icon-automatic" },
    { key: "engine", label: item.engine.charAt(0).toUpperCase() + item.engine.slice(1), icon: "icon-petrol" },
    item.AC && { key: "AC", label: "AC", icon: "icon-ac" },
    item.kitchen && { key: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
    item.bathroom && { key: "bathroom", label: "Bathroom", icon: "icon-bathroom" },
    item.TV && { key: "TV", label: "TV", icon: "icon-tv" },
  ].filter(Boolean) as { key: string; label: string; icon: string }[];

  return (
    <li className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={item.gallery[0]?.thumb ?? "/images/default-camper.jpg"}
          alt={item.name}
          fill
          className={css.image}
        />
      </div>

        <div className={css.content}>
            <div className={css.header}>
                <h2 className={css.name}>{item.name}</h2>
                <div className={css.priceWrapper}>
                    <span className={css.price}>€{item.price.toFixed(2)}</span>
                      <button 
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        type="button" 
                        className={`${css.favoriteBtn} ${isFavorite ? css.active : ""}`}
                        onClick={handleFavoriteClick}
                        >
                        <svg width="24" height="24" className={css.heartIcon}>
                            <use href={`/icons/sprite.svg#icon-heart${isFavorite ? "-filled" : ""}`} />
                        </svg>
                    </button>  
                </div>    
            </div>

        {/* Рейтинг та Локація */}
        <div className={css.subHeader}>
          <div className={css.ratingWrapper}>
            <svg width="16" height="16" className={css.starIcon}>
              <use href="/icons/sprite.svg#icon-star" />
            </svg>
            <span className={css.ratingText}>
              {item.rating} ({item.reviews.length} Reviews)
            </span>
          </div>
          <div className={css.locationWrapper}>
            <svg width="16" height="16" className={css.mapIcon}>
              <use href="/icons/sprite.svg#icon-map" />
            </svg>
            <span>{item.location}</span>
          </div>
        </div>

        {/* опис */}
        <p className={css.description}>{item.description}</p>

        {/* теги */}
        <ul className={css.tagsList}>
          {tags.map((tag) => (
            <li key={tag.key} className={css.tag}>
              <svg width="20" height="20">
                <use href={`/icons/sprite.svg#${tag.icon}`} />
              </svg>
              <span>{tag.label}</span>
            </li>
          ))}
        </ul>

        {/* кнопка*/}
        <button type="button" className={css.showMoreBtn}>
          Show more
        </button>
      </div>
    </li>
  );
};

export default CamperCard;