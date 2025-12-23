import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { FullScreenLoading } from "../components/FullScreenLoading";
import { ResultScreen } from "../components/ResultScreen";

export function CheckResults() {
  const [latestDraw, setLatestDraw] = useState(null);
  const [result, setResult] = useState(null);

  const [loadingGame, setLoadingGame] = useState(false);
  const [showResultScreen, setShowResultScreen] = useState(false);

  async function loadDraw() {
    try {
      const { data } = await api.get("/draws/latest");
      setLatestDraw(data);
    } catch {
      setLatestDraw(null);
    }
  }

  useEffect(() => {
    loadDraw();
  }, []);

  async function check() {
    setLoadingGame(true);
    setShowResultScreen(false);

    // Efeito "gamificado": segura 2.2s mesmo que a API responda rápido
    const minDelay = new Promise((r) => setTimeout(r, 2200));

    try {
      const req = api.get("/results/latest");
      const [{ data }] = await Promise.all([req, minDelay]);

      setResult(data);
      setLoadingGame(false);
      setShowResultScreen(true);
    } catch {
      setLoadingGame(false);
      setResult({
        totals: { hits4: 0, hits5: 0, hits6: 0 },
        winners: { hits4: [], hits5: [], hits6: [] },
      });
      setShowResultScreen(true);
    }
  }

  return (
    <>
      <div className="card">
        <div className="h1">Conferir Jogos</div>

        <div className="card" style={{ borderColor: "var(--ms-green)" }}>
          <div style={{ fontWeight: 900, color: "var(--ms-green)" }}>Último sorteio</div>
          {!latestDraw && <div className="muted">Nenhum sorteio cadastrado ainda.</div>}
          {latestDraw && (
            <div className="row" style={{ marginTop: 10 }}>
              {latestDraw.numbers.map((n, i) => (
                <span key={i} className="badge">
                  {String(n).padStart(2, "0")}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="spacer" />
        <button className="btn" onClick={check} disabled={!latestDraw || loadingGame}>
          Conferir jogos
        </button>

        {!latestDraw && (
          <div className="spacer" />
        )}
      </div>

      <FullScreenLoading open={loadingGame} />

      <ResultScreen
        open={showResultScreen}
        result={result}
        onClose={() => setShowResultScreen(false)}
      />
    </>
  );
}
