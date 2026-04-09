import CodeForm from "../components/CodeForm";

export default function Home() {
  return (
    <main className="page-shell">
      <aside className="page-aside">
        <div className="aside-panel">
          <span className="aside-eyebrow">Guía rápida</span>
          <h2>Tu espacio para probar código</h2>
          <p>
            Copia y pega tu bloque de código, selecciona la personalidad y presiona
            enviar. El resultado se mostrará en el panel de respuesta.
          </p>

          <div className="aside-list">
            <div className="aside-item">
              <strong>Senior arrogante</strong>
              <p>Explícame como si yo ya supiera, pero dame las claves.</p>
            </div>
            <div className="aside-item">
              <strong>Pirata viejo verde</strong>
              <p>Estilo divertido, directo y con mucha jerga propia.</p>
            </div>
            <div className="aside-item">
              <strong>Ñeño paisa</strong>
              <p>Cálido, coloquial y con sabor a Medellín.</p>
            </div>
          </div>
        </div>
      </aside>

      <section className="page-card">
        <CodeForm />
      </section>
    </main>
  );
}
