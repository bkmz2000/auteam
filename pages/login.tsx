import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = (router.query.from as string) || "/admin";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(from);
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Вход — Ауттим</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9f5ff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "2.5rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            width: "100%",
            maxWidth: "360px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem", color: "#1a1a2e" }}>
            Вход для редактора
          </h1>
          <p style={{ color: "#666", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
            Введите пароль для доступа к редактированию сайта
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              autoFocus
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: error ? "2px solid #e53e3e" : "2px solid #e2e8f0",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box",
                marginBottom: "1rem",
              }}
            />
            {error && (
              <p style={{ color: "#e53e3e", fontSize: "0.85rem", marginBottom: "1rem" }}>
                Неверный пароль
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              style={{
                width: "100%",
                padding: "0.75rem",
                background: loading ? "#c4b5fd" : "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Проверка..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
