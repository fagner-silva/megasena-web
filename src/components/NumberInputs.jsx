export function NumberInputs({
  numbers,
  setNumbers,
  min = 6,
  max = 20,
  label = "Números",
}) {
  function setAt(i, value) {
    const n = value === "" ? "" : Number(value);
    const next = [...numbers];
    next[i] = n;
    setNumbers(next);
  }

  function addBox() {
    if (numbers.length >= max) return;
    setNumbers([...numbers, ""]);
  }

  function removeBox() {
    if (numbers.length <= min) return;
    setNumbers(numbers.slice(0, -1));
  }

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 800 }}>{label}</div>
          <div className="muted" style={{ fontSize: 12 }}>
            {min} a {max} dezenas (1–60, sem repetir)
          </div>
        </div>

        <div className="row">
          <button className="btn secondary" onClick={removeBox} disabled={numbers.length <= min}>
            − Remover
          </button>
          <button className="btn" onClick={addBox} disabled={numbers.length >= max}>
            + Adicionar
          </button>
        </div>
      </div>

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
    </div>
  );
}
