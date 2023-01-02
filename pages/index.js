import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [timeInput, setTimeInput] = useState("");
  const [seasonInput, setSeasonInput] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [result, setResult] = useState("");

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
        <h3>Recommend some things to do</h3>
        <form onSubmit={onSubmit}>
          <select
            id="time"
            type="text"
            name="time"
            placeholder="Enter a time of day"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
          >
            <option value="">Select a time of day</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
          <select
            type="text"
            name="season"
            placeholder="Enter a season"
            value={seasonInput}
            onChange={(e) => setSeasonInput(e.target.value)}
          >
            <option value="">Select a season</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
          </select>
          <select
            type="text"
            name="state"
            placeholder="Enter a state"
            value={stateInput}
            onChange={(e) => setStateInput(e.target.value)}
          >
            <option value="">Select a state</option>
            <option value="alabama">Alabama</option>
            <option value="alaska">Alaska</option>
            <option value="arizona">Arizona</option>
            <option value="arkansas">Arkansas</option>
            <option value="california">California</option>
            <option value="colorado">Colorado</option>
            <option value="connecticut">Connecticut</option>
            <option value="delaware">Delaware</option>
            <option value="florida">Florida</option>
            <option value="georgia">Georgia</option>
            <option value="hawaii">Hawaii</option>
            <option value="idaho">Idaho</option>
            <option value="illinois">Illinois</option>
            <option value="indiana">Indiana</option>
            <option value="iowa">Iowa</option>
            <option value="kansas">Kansas</option>
            <option value="kentucky">Kentucky</option>
            <option value="louisiana">Louisiana</option>
            <option value="maine">Maine</option>
            <option value="maryland">Maryland</option>
            <option value="massachusetts">Massachusetts</option>
            <option value="michigan">Michigan</option>
            <option value="minnesota">Minnesota</option>
            <option value="mississippi">Mississippi</option>
            <option value="missouri">Missouri</option>
            <option value="montana">Montana</option>
            <option value="nebraska">Nebraska</option>
            <option value="nevada">Nevada</option>
            <option value="new hampshire">New Hampshire</option>
            <option value="new jersey">New Jersey</option>
            <option value="new mexico">New Mexico</option>
            <option value="new york">New York</option>
            <option value="north carolina">North Carolina</option>
            <option value="north dakota">North Dakota</option>
            <option value="ohio">Ohio</option>
            <option value="oklahoma">Oklahoma</option>
            <option value="oregon">Oregon</option>
            <option value="pennsylvania">Pennsylvania</option>
            <option value="rhode island">Rhode Island</option>
            <option value="south carolina">South Carolina</option>
            <option value="south dakota">South Dakota</option>
            <option value="tennessee">Tennessee</option>
            <option value="texas">Texas</option>
            <option value="utah">Utah</option>
            <option value="vermont">Vermont</option>
            <option value="virginia">Virginia</option>
            <option value="washington">Washington</option>
            <option value="west virginia">West Virginia</option>
            <option value="wisconsin">Wisconsin</option>
            <option value="wyoming">Wyoming</option>
          </select>
          <input type="submit" value="Generate activities" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
