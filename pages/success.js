import Head from "next/head";
import styles from "./index.module.css";

export default function Success() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Success</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Thanks for your order!</h1>
        <p>
          We appreciate your business! If you have any questions, please email
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </main>
    </div>
  );
}