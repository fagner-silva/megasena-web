export function ResultScreen({ open, onClose, result }) {
  if (!open) return null;

  const totals = result?.totals || { hits4: 0, hits5: 0, hits6: 0 };
  const totalWins = (totals.hits4 || 0) + (totals.hits5 || 0) + (totals.hits6 || 0);
  const win = totalWins > 0;

  const bg = win ? "var(--ms-green)" : "#b42318";
  const emoji = win ? "🎉" : "😢";
  const title = win ? "Você teve jogo(s) contemplado!" : "Não foi dessa vez…";
  const subtitle = win
    ? "Bora ver quantos acertos você fez 👇"
    : "Mas relaxa: a próxima pode ser a sua!";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: bg,
        zIndex: 1000,
        padding: 16,
        overflow: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          color: "white",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1 }}>
              {emoji} {title}
            </div>
            <div style={{ opacity: 0.95, fontWeight: 700, marginTop: 6 }}>{subtitle}</div>
          </div>

          <button
            onClick={onClose}
            className="btn secondary"
            style={{
              background: "rgba(255,255,255,.15)",
              borderColor: "rgba(255,255,255,.35)",
              color: "white",
            }}
          >
            Fechar
          </button>
        </div>

        <div style={{ height: 16 }} />

        {/* Card central */}
        <div
          className="card"
          style={{
            background: "rgba(255,255,255,.12)",
            borderColor: "rgba(255,255,255,.25)",
            color: "white",
          }}
        >
          <div className="row">
            <span className="badge" style={{ background: "rgba(255,255,255,.15)", borderColor: "rgba(255,255,255,.25)", color: "white" }}>
              ✅ Quadra (4): {totals.hits4}
            </span>
            <span className="badge" style={{ background: "rgba(255,255,255,.15)", borderColor: "rgba(255,255,255,.25)", color: "white" }}>
              ⭐ Quina (5): {totals.hits5}
            </span>
            <span className="badge" style={{ background: "rgba(255,255,255,.15)", borderColor: "rgba(255,255,255,.25)", color: "white" }}>
              🎯 Sena (6): {totals.hits6}
            </span>
          </div>

          <div style={{ height: 12 }} />
          {!win && (
            <div style={{ fontWeight: 800 }}>
              Dica: tente variar combinações e cadastre jogos com mais dezenas para aumentar as chances (mesmo assim ainda é difícil 😅).
            </div>
          )}

          {win && (
            <div style={{ fontWeight: 800 }}>
              Você mandou bem! Abaixo estão os seus jogos contemplados 👇
            </div>
          )}
        </div>

        {/* Detalhes (quando ganhou) */}
        {win && (
          <>
            <div style={{ height: 16 }} />
            <div style={{ display: "grid", gap: 12 }}>
              {["hits6", "hits5", "hits4"].map((k) => {
                const list = result?.winners?.[k] || [];
                if (!list.length) return null;

                const label =
                  k === "hits6" ? "🎯 Sena (6)" : k === "hits5" ? "⭐ Quina (5)" : "✅ Quadra (4)";

                return (
                  <div
                    key={k}
                    className="card"
                    style={{
                      background: "rgba(255,255,255,.12)",
                      borderColor: "rgba(255,255,255,.25)",
                      color: "white",
                    }}
                  >
                    <div style={{ fontWeight: 900, fontSize: 18 }}>{label}</div>
                    <div style={{ height: 10 }} />

                    {list.map(({ game, hits }, idx) => (
                      <div key={idx} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 900 }}>{game.description}</div>
                        <div style={{ opacity: 0.9, fontSize: 12 }}>Acertos: {hits}</div>
                        <div className="row" style={{ marginTop: 8 }}>
                          {game.numbers.map((n, i) => (
                            <span
                              key={i}
                              className="badge"
                              style={{
                                background: "rgba(255,255,255,.15)",
                                borderColor: "rgba(255,255,255,.25)",
                                color: "white",
                              }}
                            >
                              {String(n).padStart(2, "0")}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
