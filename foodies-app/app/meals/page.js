import Link from "next/link";
import React from "react";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
const Mealspage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delecious meals created{" "}
          <span className={classes.highlight}>By you</span>
        </h1>
        <p>Chosse you fav recipe and cook it youself. It is easy and fun</p>
        <p className={classes.cta}>
          <Link href="/meals/share"> Share Your favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealsGrid meals={[]} />
      </main>
    </>
  );
};

export default Mealspage;
