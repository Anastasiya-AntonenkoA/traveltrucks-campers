"use client";

// Прибираємо "async" тут
export default function BookForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // логіка відправки
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ваші поля форми */}
      <button type="submit">Send</button>
    </form>
  );
}