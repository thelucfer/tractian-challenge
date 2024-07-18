import "./styles/main.css";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import { Header } from "./components/Header";

export const App = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>footer</footer>
    </>
  );
};
