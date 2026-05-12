import { useState } from "react";

// Tipi per le props
interface LuogoCardProps {
  foto: string;
  titolo: string;
  descrizione: string;
  icone: string[];
}

const LuogoCard: React.FC<LuogoCardProps> = ({ foto, titolo, descrizione, icone }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  // Mostra solo i primi 100 caratteri se non è espanso
  const breve = descrizione.length > 100 ? descrizione.slice(0, 100) + "..." : descrizione;

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
      {/* Colonna foto */}
      <div style={{ flex: 1 }}>
        <img src={foto} alt={titolo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Colonna descrizione */}
      <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
        <h3>{titolo}</h3>
        <p>{expanded ? descrizione : breve}</p>
        {descrizione.length > 100 && (
          <button onClick={() => setExpanded(!expanded)} style={{ marginTop: "auto", alignSelf: "flex-start" }}>
            {expanded ? "Mostra meno" : "Leggi tutto"}
          </button>
        )}
      </div>

      {/* Colonna icone */}
      <div style={{ flex: 0.6, display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px" }}>
        {icone.map((icona, i) => (
          <span key={i}>{icona}</span>
        ))}
      </div>
    </div>
  );
};

// Esempio di utilizzo
const PlaceItemExample: React.FC = () => {
  const luoghi: LuogoCardProps[] = [
    {
      foto: "https://via.placeholder.com/150",
      titolo: "Castello Medioevale",
      descrizione: "Questo castello è stato costruito nel XII secolo e ha una storia incredibile, piena di torri, segreti e leggende...",
      icone: ["🏰", "🖼️"]
    },
    {
      foto: "https://via.placeholder.com/150",
      titolo: "Lago Blu",
      descrizione: "Un lago cristallino circondato da montagne, perfetto per passeggiate e picnic.",
      icone: ["🌊", "⛰️"]
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      {luoghi.map((luogo, i) => (
        <LuogoCard key={i} {...luogo} />
      ))}
    </div>
  );
};

export default PlaceItemExample;
