"use client";

import { Camper, getCampers, FilterParams } from "@/lib/api";
import CamperCard from "../CamperCard/CamperCard";
import css from "./CamperList.module.css";
import Filters from "../Filters/Filters";
import { useState } from "react";


type Props = {
    initialData: { items: Camper[]; total: number };
};

const CamperList = ({ initialData }: Props) => {
    const [campers, setCampers] = useState<Camper[]>(initialData.items);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(initialData.items.length < 4);
    const [currentFilters, setCurrentFilters] = useState<FilterParams | undefined>(undefined);

    const fetchCampers = async (nextPage: number, filters: FilterParams | undefined, isNewSearch: boolean) => {
        setIsLoading(true);
        try {
            const data = await getCampers(nextPage, 4, filters ?? undefined); 
            
            if (isNewSearch) {
                setCampers(data.items);
                setPage(1);
            } else {
                setCampers((prev) => [...prev, ...data.items]);
                setPage(nextPage);
            }
            
            setIsEnd(data.items.length < 4);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (filters: FilterParams) => {
        setCurrentFilters(filters);
        fetchCampers(1, filters, true);
    };

    const handleLoadMore = () => {
        fetchCampers(page + 1, currentFilters, false);
    };

    return (
        <div className={css.container}>
            <Filters onSearch={handleSearch} />
            
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