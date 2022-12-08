import Head from "next/head";
import Image from "next/image";
import { ChangeEvent } from "react";
import styles from "../styles/Home.module.css";
import { Readable } from "stream";

export default function Home() {
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files?.item(0);

    if (file) {
      console.log(file);

      const fileStream = file.stream()
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ marginTop: 30 }}>
        <input onChange={handleFileInput} type="file" />
      </div>
    </div>
  );
}
