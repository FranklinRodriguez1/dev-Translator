"use client";

import { useState } from "react";

export default function CodeForm() {
  const [code, setCode] = useState("");
  const [personality, setPersonality] = useState("senior");
  const [response, setResponse] = useState(
    "Aquí aparecerá la respuesta de Gemini cuando se complete la integración del backend."
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    setError("");
    setResponse("");

    if (!code.trim()) {
      setError("Debes ingresar un bloque de código antes de enviar.");
      return;
    }

    setLoading(true);

    fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, personality }),
    })
      .then((res) => {
        return res.json().then((data) => {
          if (!res.ok) {
            throw new Error(data.error || "Error al procesar la solicitud.");
          }
          return data;
        });
      })
      .then((data) => {
        setResponse(data.explanation || "No se recibió respuesta.");
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : "Ocurrió un error inesperado al enviar la petición."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <section className="code-form">
      <div className="hero">
        <span className="eyebrow">Dev Translator</span>
        <h1>Analiza tu bloque de código con estilo.</h1>
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

        <button
          type="button"
          className="cta-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar consulta"}
        </button>
      </div>

      <div className="response-box">
        <div className="response-label">Respuesta</div>
        {error ? <p className="response-error">{error}</p> : <p>{response}</p>}
      </div>
    </section>
  );
}
