import { useState } from "react";
import { api } from "../lib/api";
import { NumberInputs } from "../components/NumberInputs";

export function CreateGame() {
  const [description, setDescription] = useState("");
  const [numbers, setNumbers] = useState([ "", "", "", "", "", "" ]);
  const [msg, setMsg] = useState("");

  async function handleSave() {
    setMsg("");
    const payload = {
      description,
      numbers: numbers.map(Number),
    };

    try {
      await api.post("/games", payload);
      setMsg("✅ Jogo cadastrado com sucesso!");
      setDescription("");
      setNumbers([ "", "", "", "", "", "" ]);
    } catch (e) {
      setMsg("❌ Erro ao cadastrar. Verifique números (1–60) e duplicados.");
    }
  }

  return (
    <div className="card">
      <div className="h1">Cadastrar Jogo</div>

      <label className="muted">Descrição</label>
      <input
        className="input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Ex: Bolao da Firma"
      />

      <div className="spacer" />
      <NumberInputs numbers={numbers} setNumbers={setNumbers} />

      <div className="spacer" />
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="muted">{msg}</span>
        <button className="btn" onClick={handleSave}>Salvar</button>
      </div>
    </div>
  );
}
