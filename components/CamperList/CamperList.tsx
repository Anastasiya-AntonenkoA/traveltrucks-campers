"use client";

import { Camper, getCampers } from "@/lib/api";
import CamperCard from "../CamperCard/CamperCard";
import css from "./CamperList.module.css";
import { useState } from "react";


type Props = {
    initialData: {
    items: Camper[];
    total: number;
    };
};

const CamperList = ({ initialData }: Props) => {
    const [campers, setCampers] = useState<Camper[]>(initialData.items);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(initialData.items.length < 4);

    const handleLoadMore = async () => {
        const nextPage = page + 1;
        setIsLoading(true);

        try {
            const data = await getCampers(nextPage, 4);
            if (data.items.length < 4) {
                setIsEnd(true);
            }
            setCampers((prev) => [...prev, ...data.items]);
            setPage(nextPage);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
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
                    {campers.map((camper) => (
                        <CamperCard key={camper.id} item={camper} />
                    ))}
                </ul>

                {!isEnd && (
                    <div className={css.loadMoreWrapper}>
                        <button 
                            type="button" 
                            className={css.loadMoreButton} 
                            onClick={handleLoadMore}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Load more"}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default CamperList;