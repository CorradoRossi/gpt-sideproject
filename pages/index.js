import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [timeInput, setTimeInput] = useState("");
  const [seasonInput, setSeasonInput] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ time: timeInput, season: seasonInput, state: stateInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTimeInput("");
      setSeasonInput("");
      setStateInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Things to do app</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Recommend something to do</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="time"
            placeholder="Enter a time of day"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
          />
          <input
            type="text"
            name="season"
            placeholder="Enter a season"
            value={seasonInput}
            onChange={(e) => setSeasonInput(e.target.value)}
          />
          <input
            type="text"
            name="state"
            placeholder="Enter a state"
            value={stateInput}
            onChange={(e) => setStateInput(e.target.value)}
          />
          <input type="submit" value="Generate activities" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
