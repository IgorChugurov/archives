"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!document.body) {
      return;
    }

    document.body.style.overflowY = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [open]);

  const handleClick = (url: string) => {
    router?.push(url);
    if (open) {
      setOpen(false);
    }
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : status === "authenticated" ? (
        <>
          <Link href="/archrecords" className={styles.link}>
            Dashboard
          </Link>
          <span className={styles.link} onClick={() => signOut()}>
            Logout
          </span>
        </>
      ) : (
        <></>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <span onClick={() => handleClick("/")}>Homepage</span>
          <span onClick={() => handleClick("/about")}>About</span>
          <span onClick={() => handleClick("/contact")}>Contact</span>

          {status === "unauthenticated" ? (
            <span onClick={() => handleClick("/login")}>Login</span>
          ) : status === "authenticated" ? (
            <>
              <span onClick={() => handleClick("/archrecords")}>Dashboard</span>

              <span className={styles.link}>Logout</span>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
