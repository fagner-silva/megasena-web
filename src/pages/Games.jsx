import { useEffect, useState } from "react";
import { api } from "../lib/api";

export function Games() {
  const [games, setGames] = useState([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const { data } = await api.get("/games");
    setGames(data);
  }

  useEffect(() => { load(); }, []);

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

  return (
    <div className="card">
      <div className="h1">Meus Jogos</div>
      <div className="muted">{msg}</div>

      <div className="spacer" />
      {games.length === 0 && <div className="muted">Nenhum jogo cadastrado.</div>}

      <div style={{ display: "grid", gap: 12 }}>
        {games.map((g) => (
          <div key={g._id} className="card" style={{ borderColor: "var(--border)" }}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 900 }}>{g.description}</div>
                <div className="muted" style={{ fontSize: 12 }}>Qtd dezenas: {g.numbers.length}</div>
              </div>
              <button className="btn danger" onClick={() => remove(g._id)}>Excluir</button>
            </div>

            <div className="spacer" />
            <div className="row">
              {g.numbers.map((n, i) => (
                <span key={i} className="badge">{String(n).padStart(2, "0")}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
