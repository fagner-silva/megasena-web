import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: isActive ? "var(--ms-green)" : "white",
  color: isActive ? "white" : "var(--ms-dark)",
  fontWeight: 700,
});

export function Navbar() {
  return (
    <div className="card" style={{ marginBottom: 16, borderColor: "var(--ms-green)" }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 900, color: "var(--ms-green)" }}>MEGA-SENA</div>
          <div className="muted" style={{ fontSize: 12 }}>Registrar e conferir jogos</div>
        </div>

        <div className="row">
          <NavLink to="/" style={linkStyle}>Cadastrar Jogo</NavLink>
          <NavLink to="/jogos" style={linkStyle}>Jogos</NavLink>
          <NavLink to="/sorteio" style={linkStyle}>Cadastrar Sorteio</NavLink>
          <NavLink to="/conferir" style={linkStyle}>Conferir</NavLink>
        </div>
      </div>
    </div>
  );
}
