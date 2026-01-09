import css from "./page.module.css"

const Home = () => {
  return (
    <main className={css.container}>
      <h1 className={css.title}>Campers of your dreams</h1>
      <p className={css.description}>You can find everything you want in our catalog</p>
    </main>
  );
};

export default Home;
