import Link from "next/link";
import Image from "next/image";
import css from "./Header.module.css";

export default async function Header() {

  return (
    <header className={css.header}>
        <div className={css.container}>
            <Link href="/" className={css.logo} aria-label="TravelTrucks-Home">
                <Image
                    src="/images/TravelTrucks.png"
                    alt="ToolNext"
                    width={136}
                    height={16}
                    priority/>
            </Link>
                
            <nav className={css.nav} aria-label="Navigation">
                <ul className={css.navigation}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/catalog">Catalog</Link></li>
                </ul>
            </nav>
        </div>
    </header>
  );
}