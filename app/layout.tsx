import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Dev Translator",
  description: "Generador de explicaciones de código con personalidad IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="">
      <body className="app-shell">
        <div className="app-background" />
        <div className="app-frame">
          <header className="app-header">
            <div>
              <span className="brand-pill">Dev Translator</span>
              <p className="brand-copy">
                Analiza bloques de código con tres personalidades únicas.
              </p>
            </div>
          </header>

          {children}

          <footer className="app-footer">
            <p>Tu espacio para convertir lógica en explicación junto a Gemini.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
