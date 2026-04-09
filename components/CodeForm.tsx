"use client";

import { useState } from "react";

export default function CodeForm() {
  const [code, setCode] = useState("");
  const [personality, setPersonality] = useState("senior");
  const [response] = useState(
    "Aquí aparecerá la respuesta de Gemini cuando se complete la integración del backend."
  );

  return (
    <section className="code-form">
      <div className="hero">
        <span className="eyebrow">Dev Translator</span>
        <h1 >Analiza tu bloque de código con estilo.</h1>
        <p className="hero-copy">
          Pega tu código, elige una personalidad y recibe la respuesta en el panel
          de resultados.
        </p>
      </div>

      <div className="input-group">
        <label htmlFor="code">Código</label>
        <textarea
          id="code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Pega tu bloque de código aquí..."
        />
      </div>

      <div className="input-row">
        <div className="select-group">
          <label htmlFor="personality">Personalidad</label>
          <select
            id="personality"
            value={personality}
            onChange={(event) => setPersonality(event.target.value)}
            className="personality-select"
          >
            <option value="senior">Senior mamón y arrogante</option>
            <option value="pirata">Pirata centrado y viejo verde</option>
            <option value="paisa">Ñero paisa de Medellín</option>
          </select>
        </div>

        <button type="button" className="cta-button">
          Enviar consulta
        </button>
      </div>

      <div className="response-box">
        <div className="response-label">Respuesta</div>
        <p>{response}</p>
      </div>
    </section>
  );
}
