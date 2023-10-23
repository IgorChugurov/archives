import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";

import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

import AuthLinks from "../authLinks /AuthLinks";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 3,
    title: "Search",
    url: "/blog",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },

  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
];

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">Archives</Link>
      </div>

      <div className={styles.links}>
        <DarkModeToggle />
        {links.map(link => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
