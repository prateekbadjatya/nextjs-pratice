import Link from "next/link";
import React from "react";
import logoImg from "@/assets/logo.png";
//import image is an oject where path to image is stored inside src property

import styles from "./main-header.module.css";
import Image from "next/image";

export const MainHeader = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href={"/"}>
        {/* <img
          src={logoImg.src}
          alt="A plate with food on it"
        /> */}
        <Image priority={true} lazy={false} height={50} width={50} src={logoImg.src} alt="A plate with food on it" />
        Next Level Food
      </Link>

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/meals">Browse Meals</Link>
          </li>
          <li>
            <Link href="/community">Foodies Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
