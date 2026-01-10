"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ padding: 24 }}>
      <h2>Something was wrong</h2>
      <p>{error.message}</p>

      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}