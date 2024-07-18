import { useQuery } from "@tanstack/react-query";
import styles from "./Header.module.css";
import logo from "@/assets/logo.png";
import unitIcon from "@/assets/unit.svg";
import { companiesQuery } from "@/query";
import { Spinner } from "./Spinner";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const { data: companies, isPending } = useQuery(companiesQuery());

  return (
    <header className={styles.header}>
      <img src={logo} alt="tractian" className={styles.logo} />
      {isPending && <Spinner />}
      {!isPending && (
        <nav className={styles.nav}>
          <ul className={styles.linksList}>
            {companies?.map((company) => (
              <li className={styles.linkItem} key={company.id}>
                <NavLink
                  to={company.id}
                  className={({ isActive }) =>
                    !isActive ? styles.link : styles.linkActive
                  }
                >
                  <img src={unitIcon} alt="unit icon" />
                  <span>{company.name} unit</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
