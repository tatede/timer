"use client";
import { useEffect, useState } from "react";

export default function TimerPage() {
  const [timeLeft, setTimeLeft] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const target = new Date("2027-05-02T22:00:00-04:00").getTime();

    function update() {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setDone(true);
        setTimeLeft("00:00:00");
        return;
      }

      const hours = Math.floor(diff / 1000 / 60 / 60);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
      );
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "monospace",
      }}
    >
      <p style={{ fontSize: "1rem", color: "#888", marginBottom: "1rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        Time remaining until 10:00 PM EST
      </p>
      <p
        style={{
          fontSize: "6rem",
          fontWeight: 900,
          letterSpacing: "0.05em",
          color: done ? "#ef4444" : "#22d3ee",
          margin: 0,
        }}
      >
        {timeLeft || "..."}
      </p>
      {done && (
        <p style={{ marginTop: "1.5rem", fontSize: "1.5rem", color: "#ef4444" }}>
          Time&apos;s up!
        </p>
      )}
    </main>
  );
}
