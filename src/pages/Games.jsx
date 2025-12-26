import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

export function Games() {
  const [games, setGames] = useState([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const { data } = await api.get("/games");
    setGames(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    setMsg("");
    try {
      await api.delete(`/games/${id}`);
      setMsg("✅ Jogo removido.");
      load();
    } catch {
      setMsg("❌ Erro ao remover.");
    }
  }

  // ✅ Stats (total + por dezenas)
  const stats = useMemo(() => {
    const total = games.length;

    // cria distribuição 6..20 com 0
    const byDozens = {};
    for (let d = 6; d <= 20; d++) byDozens[d] = 0;

    let min = null;
    let max = null;

    for (const g of games) {
      const qtd = Array.isArray(g.numbers) ? g.numbers.length : 0;
      if (qtd >= 6 && qtd <= 20) byDozens[qtd] += 1;

      min = min === null ? qtd : Math.min(min, qtd);
      max = max === null ? qtd : Math.max(max, qtd);
    }

    return { total, byDozens, min, max };
  }, [games]);

  const mostUsedDozens = useMemo(() => {
    // retorna a(s) dezenas com maior quantidade (pode empatar)
    const entries = Object.entries(stats.byDozens);
    const maxCount = Math.max(...entries.map(([, v]) => v), 0);
    const top = entries.filter(([, v]) => v === maxCount && v > 0).map(([k]) => Number(k));
    return { maxCount, top };
  }, [stats.byDozens]);

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="h1">Meus Jogos</div>
          <div className="muted">{msg}</div>
        </div>

        <button className="btn secondary" onClick={load}>
          Atualizar
        </button>
      </div>

      <div className="spacer" />

      {/* ✅ Resumo */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        <div className="card" style={{ borderColor: "var(--ms-green)" }}>
          <div className="muted" style={{ fontSize: 12 }}>Total de jogos</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "var(--ms-green)" }}>
            {stats.total}
          </div>
        </div>

        <div className="card">
          <div className="muted" style={{ fontSize: 12 }}>Menor / Maior dezenas</div>
          <div style={{ fontSize: 18, fontWeight: 900 }}>
            {stats.total === 0 ? "—" : `${stats.min} / ${stats.max}`}
          </div>
          <div className="muted" style={{ fontSize: 12 }}>
            (entre 6 e 20)
          </div>
        </div>

        <div className="card">
          <div className="muted" style={{ fontSize: 12 }}>Mais usado</div>
          <div style={{ fontSize: 18, fontWeight: 900 }}>
            {mostUsedDozens.top.length === 0 ? "—" : `${mostUsedDozens.top.join(", ")} dezenas`}
          </div>
          <div className="muted" style={{ fontSize: 12 }}>
            {mostUsedDozens.top.length === 0 ? "" : `${mostUsedDozens.maxCount} jogo(s)`}
          </div>
        </div>
      </div>

      <div className="spacer" />

      {/* ✅ Distribuição por dezenas */}
      <div className="card">
        <div style={{ fontWeight: 900 }}>Distribuição por dezenas</div>
        <div className="muted" style={{ fontSize: 12 }}>
          Quantos jogos você tem com 6, 7, 8... até 20 dezenas
        </div>

        <div className="spacer" />

        <div className="row" style={{ gap: 8 }}>
          {Object.entries(stats.byDozens).map(([dozens, count]) => (
            <span key={dozens} className="badge" title={`${count} jogo(s) com ${dozens} dezenas`}>
              {dozens}D: {count}
            </span>
          ))}
        </div>
      </div>

      <div className="spacer" />

      {/* ✅ Lista */}
      {games.length === 0 && <div className="muted">Nenhum jogo cadastrado.</div>}

      <div style={{ display: "grid", gap: 12 }}>
        {games.map((g) => (
          <div key={g._id} className="card" style={{ borderColor: "var(--border)" }}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 900 }}>{g.description}</div>
                <div className="muted" style={{ fontSize: 12 }}>
                  Qtd dezenas: {g.numbers?.length ?? 0}
                </div>
              </div>
              <button className="btn danger" onClick={() => remove(g._id)}>
                Excluir
              </button>
            </div>

            <div className="spacer" />
            <div className="row">
              {(g.numbers || []).map((n, i) => (
                <span key={i} className="badge">
                  {String(n).padStart(2, "0")}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
