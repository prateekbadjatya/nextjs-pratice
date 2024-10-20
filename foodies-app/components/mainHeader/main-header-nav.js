"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./main-header-nav.module.css";
import React from "react";

const MainHeaderNav = () => {
  const pathname = usePathname();
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link
              className={pathname?.startsWith("/meals") ? styles.active : ""}
              href="/meals"
            >
              Browse Meals
            </Link>
          </li>
          <li>
            <Link
              className={
                pathname?.startsWith("/community") ? styles.active : ""
              }
              href="/community"
            >
              Foodies Community
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MainHeaderNav;
