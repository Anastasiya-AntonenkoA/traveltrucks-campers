import { Camper } from "@/lib/api";
import CamperCard from "../CamperCard/CamperCard";
import css from "./CamperList.module.css";


type Props = {
  campers: Camper[];
};

const CamperList = ({ campers }: Props) => {
    return (
        <div className={css.container}>
            <aside className={css.filters}>
                {/* Тут будуть ваші фільтри */}
                <p>Filters section</p>
            </aside>

            <main className={css.catalog}>
                {/* Ваш список <CamperList /> опиниться тут */}
                <ul className={css.list}>
                    {campers.map((camper) => (
                    <CamperCard key={camper.id} item={camper} />
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default CamperList;