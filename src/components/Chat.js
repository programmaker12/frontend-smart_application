import React, { useState } from "react";

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const generateAnswer = async () => {
    setLoading(true);
    setErr("");
    setAnswer("");
    try {
      const res = await fetch(
        `http://localhost:8080/ask-ai?prompt=${encodeURIComponent(prompt)}`,
        {
          method: "GET",
          headers: { "Accept": "application/plain" }, // adjust if your API returns text/plain
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

    //   // If your API returns JSON like { answer: "..." }
    //   const data = await res;
    //   setAnswer(typeof data === "string" ? data : data.answer ?? JSON.stringify(data));

      // If your API returns plain text instead of JSON, use:
      const text = await res.text();
      setAnswer(text);
    } catch (e) {
      console.error(e);
      setErr(e.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Talk to AI</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt for your answer"
      />
      <button onClick={generateAnswer} disabled={loading || !prompt.trim()}>
        {loading ? "Generating..." : "Generate Answer"}
      </button>

      {err && <p style={{ color: "red" }}>Error: {err}</p>}
      {answer && (
        <div>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
