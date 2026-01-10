import css from "./page.module.css"
import Link from "next/link";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const Home = () => {
  return (
    <main className={css.container}>
      <div className={`${css.hero} ${inter.className}`}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.description}>
          You can find everything you want in our catalog
        </p>
        <Link className={css.button} href="/catalog">View Now</Link>
      </div>
    </main>
  );
};

export default Home;
