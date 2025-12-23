import { useState } from "react";
import { api } from "../lib/api";

export function CreateDraw() {
  const [numbers, setNumbers] = useState([ "", "", "", "", "", "" ]);
  const [msg, setMsg] = useState("");

  function setAt(i, value) {
    const n = value === "" ? "" : Number(value);
    const next = [...numbers];
    next[i] = n;
    setNumbers(next);
  }

  async function save() {
    setMsg("");
    try {
      await api.post("/draws", { numbers: numbers.map(Number) });
      setMsg("✅ Sorteio cadastrado!");
      setNumbers([ "", "", "", "", "", "" ]);
    } catch {
      setMsg("❌ Erro ao cadastrar sorteio. Verifique números (1–60) e duplicados.");
    }
  }

  return (
    <div className="card">
      <div className="h1">Cadastrar Sorteio</div>
      <div className="muted">Informe as 6 dezenas sorteadas</div>

      <div className="spacer" />
      <div className="row">
        {numbers.map((v, i) => (
          <input
            key={i}
            className="input numberBox"
            type="number"
            min={1}
            max={60}
            value={v}
            onChange={(e) => setAt(i, e.target.value)}
            placeholder="00"
          />
        ))}
      </div>

      <div className="spacer" />
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="muted">{msg}</span>
        <button className="btn" onClick={save}>Salvar Sorteio</button>
      </div>
    </div>
  );
}
