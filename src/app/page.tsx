import Image from "next/image";
import styles from "./page.module.css";
import Hero from "public/hero2.png";
import Button from "@/components/button/Button";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>The best solution for your digital products!</h1>
        <p className={styles.desc}>
          Turning your Idea into Reality. We bring together the teams from the global tech industry.
        </p>
        <Button url="/portfolio" text="See Our Works" />
      </div>
      <div className={styles.item}>
        <Image src={Hero} alt="" className={styles.img} />
      </div>
    </div>
  );
}
