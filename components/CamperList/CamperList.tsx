"use client";

import { Camper } from "@/lib/api";
import CamperCard from "../CamperCard/CamperCard";
import css from "./CamperList.module.css";
import { useState } from "react";


type Props = {
  campers: Camper[];
};

const CamperList = ({ campers }: Props) => {
    const [visibleCount, setVisibleCount] = useState(4);
    const itemsPerPage = 4;

    const currentCampers = campers.slice(0, visibleCount);

    const hasMore = visibleCount < campers.length;

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + itemsPerPage);
    };
    
    return (
        <div className={css.container}>
            <aside className={css.filters}>
                {/* Location Section */}
            <div className={css.filterGroup}>
                <h3 className={css.labelTitle}>Location</h3>
                <div className={css.inputWrapper}>
                    <svg width="18" height="20" className={css.mapIcon}>
                    <use href="/icons/sprite.svg#icon-map" />
                    </svg>
                    <input 
                    type="text"
                    placeholder="Kyiv, Ukraine" 
                    className={css.locationInput} 
                    />
                </div>
            </div>

            <p className={css.filtersText}>Filters</p>

            {/* Vehicle Equipment Section */}
            <div className={css.filterGroup}>
                <h3 className={css.sectionTitle}>Vehicle equipment</h3>
                <hr className={css.divider} />
                <div className={css.checkboxGrid}>
                    <button type="button" className={css.filterCard}>
                        <svg width="32" height="32" className={css.icon}>
                            <use href="/icons/sprite.svg#icon-ac" />
                        </svg>
                        <span>AC</span>
                    </button>
                    <button type="button" className={css.filterCard}>
                        <svg width="32" height="32" className={css.icon}>
                            <use href="/icons/sprite.svg#icon-automatic" />
                        </svg>
                        <span>Automatic</span>
                    </button>
                    <button type="button" className={css.filterCard}>
                        <svg width="32" height="32" className={css.icon}>
                            <use href="/icons/sprite.svg#icon-kitchen" />
                        </svg>
                        <span>Kitchen</span>
                    </button>
                    <button type="button" className={css.filterCard}>
                        <svg width="32" height="32" className={css.icon}>
                            <use href="/icons/sprite.svg#icon-tv" />
                        </svg>
                        <span>TV</span>
                    </button>
                    <button type="button" className={css.filterCard}>
                        <svg width="32" height="32" className={css.icon}>
                            <use href="/icons/sprite.svg#icon-bathroom" />
                        </svg>
                        <span>Bathroom</span>
                    </button>
                </div>
            </div>

            {/* Vehicle Type Section */}
            <div className={css.filterGroup}>
                <h3 className={css.sectionTitle}>Vehicle type</h3>
                <hr className={css.divider} />
                <div className={css.checkboxGrid}>
                <button type="button" className={css.filterCard}>
                    <svg width="32" height="32" className={css.icon}>
                        <use href="/icons/sprite.svg#icon-van" />
                    </svg>
                    <span>Van</span>
                </button>
                <button type="button" className={css.filterCard}>
                    <svg width="32" height="32" className={css.icon}>
                        <use href="/icons/sprite.svg#icon-fully-integrated" />
                    </svg>
                    <span>Fully Integrated</span>
                </button>
                <button type="button" className={css.filterCard}>
                    <svg width="32" height="32" className={css.icon}>
                        <use href="/icons/sprite.svg#icon-alcove" />
                    </svg>
                    <span>Alcove</span>
                </button>
                </div>
            </div>

            {/* Search Button */}
            <button type="submit" className={css.searchButton}>
                Search
            </button>
            </aside>
            <main className={css.catalog}>
                <ul className={css.list}>
                    {currentCampers.map((camper) => (
                        <CamperCard key={camper.id} item={camper} />
                    ))}
                    {hasMore && (
                        <div className={css.loadMoreWrapper}>
                            <button 
                            type="button" 
                            className={css.loadMoreButton} 
                            onClick={handleLoadMore}
                            > Load more
                            </button>
                        </div>
                    )}
                </ul>
            </main>
        </div>
    );
}

export default CamperList;