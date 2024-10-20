import Link from "next/link";

import React from "react";
import logoImg from "@/assets/logo.png";
//import image is an oject where path to image is stored inside src property

import styles from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import MainHeaderNav from "./main-header-nav";

export const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link className={styles.logo} href={"/"}>
          {/* <img
          src={logoImg.src}
          alt="A plate with food on it"
        /> */}
          <Image
            priority={true}
            lazy={false}
            height={50}
            width={50}
            src={logoImg.src}
            alt="A plate with food on it"
          />
          Next Level Food
        </Link>

        <MainHeaderNav />
      </header>
    </>
  );
};
