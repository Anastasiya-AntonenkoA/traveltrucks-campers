"use client";

import { useState } from "react";
import css from "./Filters.module.css";
import { FilterParams } from "@/lib/api";

export type FilterData = {
  location: string;
  form: string;
  features: string[];
};

type Props = {
  onSearch: (filters: FilterParams) => void;
};

const Filters = ({ onSearch }: Props) => {
  const [location, setLocation] = useState("");
  const [form, setForm] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  const toggleFeature = (feature: string) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSearch = () => {
    const params: FilterParams & Record<string, string | boolean | undefined> = {};

    if (location) params.location = location;
    if (form) params.form = form;

    features.forEach((feat) => {
      if (feat === "automatic") {
        params.transmission = "automatic";
      } else {
        params[feat] = true;
      }
    });

    onSearch(params);
  };

  return (
    <aside className={css.filters}>
      {/* Location */}
      <div className={css.filterGroup}>
        <h3 className={css.labelTitle}>Location</h3>
            <div className={css.inputWrapper}>
            <svg width="18" height="20" className={css.mapIcon}>
                <use href="/icons/sprite.svg#icon-map" />
            </svg>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Kyiv, Ukraine"
                className={css.locationInput}
            />
        </div>
      </div>

      <p className={css.filtersText}>Filters</p>

      <div className={css.filterGroup}>
        <h3 className={css.sectionTitle}>Vehicle equipment</h3>
        <hr className={css.divider} />
        <div className={css.checkboxGrid}>
          {[
            { id: "AC", label: "AC", icon: "icon-ac" },
            { id: "automatic", label: "Automatic", icon: "icon-automatic" },
            { id: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
            { id: "TV", label: "TV", icon: "icon-tv" },
            { id: "bathroom", label: "Bathroom", icon: "icon-bathroom" },
        ].map((item) => (
            <button
                key={item.id}
                type="button"
                className={`${css.filterCard} ${features.includes(item.id) ? css.active : ""}`}
                onClick={() => toggleFeature(item.id)}
                >
                <svg width="32" height="32" className={css.icon}>
                    <use href={`/icons/sprite.svg#${item.icon}`} />
                </svg>
                <span>{item.label}</span>
            </button>
        ))}
        </div>
      </div>

      {/* Vehicle Type (Single Choice) */}
      <div className={css.filterGroup}>
            <h3 className={css.sectionTitle}>Vehicle type</h3>
            <hr className={css.divider} />
        <div className={css.checkboxGrid}>
            {[
                { id: "panelTruck", label: "Van", icon: "icon-van" },
                { id: "fullyIntegrated", label: "Fully Integrated", icon: "icon-fully-integrated" },
                { id: "alcove", label: "Alcove", icon: "icon-alcove" },
            ].map((item) => (
            <button
                key={item.id}
                type="button"
                className={`${css.filterCard} ${form === item.id ? css.active : ""}`}
                onClick={() => setForm(item.id === form ? "" : item.id)}
                >
                <svg width="32" height="32" className={css.icon}>
                    <use href={`/icons/sprite.svg#${item.icon}`} />
                </svg>
                <span>{item.label}</span>
            </button>
            ))}
        </div>
    </div>

    <button type="button" onClick={handleSearch} className={css.searchButton}>
    Search
    </button>
    </aside>
  );
};

export default Filters;