import { useEffect, useMemo, useState } from "react";

export function FullScreenLoading({ open }) {
  const steps = useMemo(
    () => [
      "Carregando suas apostas…",
      "Validando seus números…",
      "Consultando o último sorteio…",
      "Calculando acertos (4/5/6)…",
      "Segura o coração…",
    ],
    []
  );

  const [i, setI] = useState(0);

  useEffect(() => {
    if (!open) return;
    setI(0);
    const t = setInterval(() => {
      setI((prev) => (prev + 1) % steps.length);
    }, 700);
    return () => clearInterval(t);
  }, [open, steps.length]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--ms-green)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        padding: 16,
      }}
    >
      <div style={{ textAlign: "center", color: "white", width: "min(520px, 100%)" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "6px solid rgba(255,255,255,.25)",
            borderTopColor: "white",
            margin: "0 auto 16px",
            animation: "spin 0.9s linear infinite",
          }}
        />

        <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 6 }}>Conferindo…</div>
        <div style={{ opacity: 0.95, fontWeight: 700 }}>{steps[i]}</div>

        <div style={{ marginTop: 16, opacity: 0.75, fontSize: 12 }}>
          Dica: você pode cadastrar jogos com até 20 dezenas 😉
        </div>
      </div>
    </div>
  );
}
