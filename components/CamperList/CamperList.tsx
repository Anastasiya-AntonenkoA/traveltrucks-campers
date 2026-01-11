"use client";

import { Camper, getCampers, FilterParams } from "@/lib/api";
import CamperCard from "../CamperCard/CamperCard";
import css from "./CamperList.module.css";
import Filters from "../Filters/Filters";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";


type Props = {
    initialData: { items: Camper[]; total: number };
};

const CamperList = ({ initialData }: Props) => {
    const searchParams = useSearchParams();
    const [campers, setCampers] = useState<Camper[]>(initialData.items);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(initialData.items.length < 4);
    const [currentFilters, setCurrentFilters] = useState<FilterParams | undefined>(undefined);

    const getFiltersFromUrl = useCallback((): FilterParams => {
        const params: FilterParams = {};
        
        const location = searchParams.get("location");
        if (location) params.location = location;

        const form = searchParams.get("form");
        if (form) params.form = form;

        const trans = searchParams.get("transmission");
        if (trans) params.transmission = trans;;
        
        if (searchParams.get("AC") === "true") params.AC = true;
        if (searchParams.get("kitchen") === "true") params.kitchen = true;
        if (searchParams.get("TV") === "true") params.TV = true;
        if (searchParams.get("bathroom") === "true") params.bathroom = true;

        return params;
    }, [searchParams]);

    const fetchCampers = useCallback(async (nextPage: number, filters: FilterParams | undefined, isNewSearch: boolean) => {
        setIsLoading(true);
        try {
            const data = await getCampers(nextPage, 4, filters); 
            
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
    }, []);

    useEffect(() => {
        const filtersFromUrl = getFiltersFromUrl();
        
        setCurrentFilters(filtersFromUrl);
        fetchCampers(1, filtersFromUrl, true);
    }, [getFiltersFromUrl, fetchCampers]);

    const handleSearch = (filters: FilterParams) => {
        setCurrentFilters(filters);
    };

    const handleLoadMore = () => {
        fetchCampers(page + 1, currentFilters, false);
    };

    return (
        <div className={css.container}>
            <Filters onSearch={handleSearch} />
            
            <main className={css.catalog}>
                <div className={css.listWrapper}>
                    {campers.length > 0 && (
                        <ul className={css.list}>
                            {campers.map((camper) => (
                                <CamperCard key={camper.id} item={camper} />
                            ))}
                        </ul>
                    )}

                    {isLoading && (
                        <div className={css.loaderOverlay}>
                            <span className={css.loader}></span>
                        </div>
                    )}
                </div>

                {campers.length === 0 && !isLoading && (
                    <div className={css.noResults}>
                        <p>No campers found matching your filters. Please try other criteria.</p>
                    </div>
                )}

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