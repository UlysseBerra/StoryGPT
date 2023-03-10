import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [lengthInput, setLengthInput] = useState(50);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput, length: lengthInput * 1.4 }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>StoryGPT</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Write me a personalized story!</h3>
        <form onSubmit={onSubmit}>
          <label class="label" htmlFor="animal"> Tell me a bit about yourself and the story you want to see: </label>
          <textarea name="animal" value={animalInput} onChange={(e) => setAnimalInput(e.target.value)}></textarea>
          <label class="label" htmlFor="length"> Length of the story (in approximate number of words): </label>
          <input type="number" name="length" value={lengthInput} onChange={(e) => setLengthInput(e.target.value)} />
          <input type="submit" value="Write!" />
        </form>
        <div className={styles.result}>{result}</div>
        <Analytics />
      </main>
    </div>
  );
}
