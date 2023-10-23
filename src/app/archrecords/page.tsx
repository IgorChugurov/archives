"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Archives = () => {
  //OLD WAY TO FETCH DATA

  // const [data, setData] = useState([]);
  // const [err, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //       cache: "no-store",
  //     });

  //     if (!res.ok) {
  //       setErr(true);
  //     }

  //     const data = await res.json()

  //     setData(data);
  //     setIsLoading(false);
  //   };
  //   getData()
  // }, []);

  const session = useSession();
  //console.log(session);

  const router = useRouter();

  //NEW WAY TO FETCH DATA
  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/archrecords`, fetcher);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/login");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const subject = e.target[1].value;
    const author = e.target[2].value;
    const date = e.target[3].value;
    const status = e.target[4].value;
    const content = e.target[5].value;

    try {
      await fetch("/api/archrecords", {
        method: "POST",
        body: JSON.stringify({
          name,
          subject,
          author,
          date,
          status,
          content,
        }),
      });
      mutate();
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/archrecords/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "loading"
            : data?.map((post: any) => (
                <div className={styles.post} key={post._id}>
                  {/* <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" width={200} height={100} />
                  </div> */}
                  <h2 className={styles.postTitle}>{post.name}</h2>
                  <span className={styles.delete} onClick={() => handleDelete(post._id)}>
                    X
                  </span>
                </div>
              ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Records</h1>
          <input type="text" placeholder="Name" className={styles.input} />
          <input type="text" placeholder="Subject" className={styles.input} />
          <input type="text" placeholder="Author" className={styles.input} />
          <input type="text" placeholder="Date" className={styles.input} />
          <input type="text" placeholder="Status" className={styles.input} />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols={30}
            rows={10}
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
};

export default Archives;
