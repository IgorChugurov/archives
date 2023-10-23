"use client";

import React, { useContext } from "react";
import styles from "./darkModeToggle.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";

const DarkModeToggle = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    // <div
    //   className={styles.container}
    //   onClick={toggleTheme}
    //   style={theme === "dark" ? { backgroundColor: "white" } : { backgroundColor: "#0f172a" }}
    // >
    //   <Image src="/moon.png" alt="" width={14} height={14} />
    //   <div
    //     className={styles.ball}
    //     style={
    //       theme === "dark" ? { left: 1, background: "#0f172a" } : { right: 1, background: "white" }
    //     }
    //   ></div>
    //   <Image src="/sun.png" alt="" width={14} height={14} />
    // </div>

    <div className={styles.container} onClick={toggleTheme}>
      <div className={styles.icon}>🌙</div>
      <div className={styles.icon}>🔆</div>
      <div className={styles.ball} style={theme === "light" ? { left: "2px" } : { right: "2px" }} />
    </div>
  );
};

export default DarkModeToggle;
