import { Camper } from "@/lib/api";
import css from "./Features.module.css";

interface FeaturesProps {
  item: Camper;
}

const Features = ({ item }: FeaturesProps) => {
  const tags = [
    { key: "transmission", label: item.transmission, icon: "icon-automatic" },
    { key: "engine", label: item.engine, icon: "icon-petrol" },
    item.AC && { key: "AC", label: "AC", icon: "icon-ac" },
    item.kitchen && { key: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
    item.bathroom && { key: "bathroom", label: "Bathroom", icon: "icon-bathroom" },
    item.TV && { key: "TV", label: "TV", icon: "icon-tv" },
    item.radio && { key: "radio", label: "Radio", icon: "icon-radio" },
  ].filter(Boolean) as { key: string; label: string; icon: string }[];

  return (
    <div className={css.container}>
      {/* Блок з іконками */}
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

      {/* Блок з деталями авто */}
      <h3 className={css.title}>Vehicle details</h3>
      <div className={css.separator}></div>
      
      <ul className={css.detailsList}>
        <li className={css.detailsItem}>
          <span>Form</span>
          <span className={css.capitalize}>{item.form}</span>
        </li>
        <li className={css.detailsItem}>
          <span>Length</span>
          <span>{item.length}</span>
        </li>
        <li className={css.detailsItem}>
          <span>Width</span>
          <span>{item.width}</span>
        </li>
        <li className={css.detailsItem}>
          <span>Height</span>
          <span>{item.height}</span>
        </li>
        <li className={css.detailsItem}>
          <span>Tank</span>
          <span>{item.tank}</span>
        </li>
        <li className={css.detailsItem}>
          <span>Consumption</span>
          <span>{item.consumption}</span>
        </li>
      </ul>
    </div>
  );
};

export default Features;