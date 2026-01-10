"use client";

import { Camper } from "@/lib/api";
import CamperCard from "../CamperCard/CamperCard";
import css from "./CamperList.module.css";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";


type Props = {
  campers: Camper[];
};

const CamperList = ({ campers }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const totalPages = Math.ceil(campers.length / itemsPerPage);

    const indexOfLastCamper = currentPage * itemsPerPage;
    const indexOfFirstCamper = indexOfLastCamper - itemsPerPage;
    const currentCampers = campers.slice(indexOfFirstCamper, indexOfLastCamper);

    const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Опціонально: скрол вгору при зміні сторінки
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                {/* Кожен елемент можна винести в окремий компонент FilterCard */}
                <button type="button" className={css.filterCard}>
                    <span className={css.icon}>🌬️</span>
                    <span>AC</span>
                </button>
                <button type="button" className={css.filterCard}>
                    <span className={css.icon}>⚙️</span>
                    <span>Automatic</span>
                </button>
                <button type="button" className={css.filterCard}>
                    <span className={css.icon}>☕</span>
                    <span>Kitchen</span>
                </button>
                <button type="button" className={css.filterCard}>
                    <span className={css.icon}>📺</span>
                    <span>TV</span>
                </button>
                <button type="button" className={css.filterCard}>
                    <span className={css.icon}>🚿</span>
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
                    <span className={css.icon}>🚐</span>
                    <span>Van</span>
                </button>
                <button type="button" className={css.filterCard}>
                    <span className={css.icon}>🚍</span>
                    <span>Fully Integrated</span>
                </button>
                <button type="button" className={css.filterCard}>
                    <span className={css.icon}>🚐</span>
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
                </ul>
                <div className={css.paginationWrapper}>
                    <Pagination 
                        totalPages={totalPages} 
                        page={currentPage} 
                        onChange={handlePageChange} 
                    />
                </div>  
            </main>
        </div>
    );
}

export default CamperList;