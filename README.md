# 🚀 Documento de Diseño: Traductor de Código con Personalidad IA

## 📌 1. Nombres Propuestos para el Sistema
Aquí tiene 5 identificadores en clave para el proyecto, enfocados en la traducción de lógica a avatares:

1. **DevAvatar Translator**
2. **CodePersona Hub**
3. **BabelScript AI**
4. **Syntax & Souls**
5. **LogicLingua**

---

## 🛠️ 2. Arquitectura y Tecnologías Clave
Para lograr un equilibrio perfecto entre rendimiento, seguridad y una interfaz visualmente impactante, utilizaremos el siguiente arsenal tecnológico:

* **Next.js (App Router):** Nuestro framework base. Nos permite tener el "Frontend" (lo que ve el usuario) y el "Backend" (donde ocultamos la clave de la IA) en un solo proyecto. Es rápido y el estándar actual de la industria.
* **TypeScript:** Añade tipado estricto a JavaScript. Evitará que cometamos errores de lógica al enviar o recibir datos de la IA.
* **Tailwind CSS:** Nuestro motor de diseño. En lugar de escribir largos archivos `.css`, usaremos clases utilitarias directamente en el HTML para crear interfaces oscuras, modernas y con brillos cibernéticos en tiempo récord.
* **@google/genai:** El SDK oficial de Google. Será el "cerebro" del sistema, encargado de procesar el código y devolver la explicación con la personalidad solicitada.

---

## ⚙️ 3. Protocolo de Implementación (Paso a Paso)

### Paso 1: Inicialización del Núcleo
Abra su terminal y ejecute el siguiente comando para generar la estructura del proyecto. Asegúrese de seleccionar **Sí (Yes)** cuando el instalador le pregunte por TypeScript, Tailwind CSS y App Router.

\`\`\`bash
npx create-next-app@latest logic-lingua
cd logic-lingua
\`\`\`

### Paso 2: Instalación de Dependencias
Instale el módulo de conexión de Google.

\`\`\`bash
npm install @google/genai
\`\`\`

### Paso 3: Configuración de la Bóveda de Seguridad
Cree un archivo llamado `.env.local` en la raíz del proyecto. Aquí almacenaremos su API Key para que jamás llegue al navegador del usuario final.

\`\`\`env
# .env.local
GEMINI_API_KEY=su_clave_secreta_aqui
\`\`\`

### Paso 4: Construcción del Servidor de IA (Backend)
Cree la ruta para su API interna. Este archivo recibirá la petición del usuario y se comunicará de forma segura con Google.
**Archivo:** `app/api/explicar/route.ts`

\`\`\`typescript
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { codigo, personalidad } = await req.json();

    const promptSistema = \`Actúa como un programador experto con personalidad de \${personalidad}. 
    Explica el siguiente código de forma técnica pero manteniendo tu personaje en todo momento, de forma concisa.
    Código:
    \${codigo}\`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: promptSistema,
    });

    return NextResponse.json({ explicacion: response.text });

  } catch (error) {
    return NextResponse.json(
      { error: "Error en los servidores de IA." },
      { status: 500 }
    );
  }
}
\`\`\`

### Paso 5: Despliegue de la Interfaz Visual (Frontend)
Crearemos una interfaz oscura y moderna usando Tailwind.
**Archivo:** `app/page.tsx`

\`\`\`tsx
"use client";
import { useState } from "react";

export default function Home() {
  const [codigo, setCodigo] = useState("");
  const [personalidad, setPersonalidad] = useState("Pirata Informático");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);

  const traducirCodigo = async () => {
    if (!codigo) return;
    setCargando(true);
    setRespuesta("");

    try {
      const res = await fetch("/api/explicar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo, personalidad })
      });
      
      const data = await res.json();
      setRespuesta(data.explicacion || data.error);
    } catch (error) {
      setRespuesta("Fallo en la comunicación con la API.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-green-400 p-10 font-mono">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-white mb-2">⚡ Code-Persona Architect</h1>
        <p className="text-gray-400">Traductor de lógica mediante IA generativa.</p>
        
        <select 
          className="w-full p-3 bg-gray-900 border border-green-500 rounded-md focus:outline-none"
          value={personalidad} 
          onChange={(e) => setPersonalidad(e.target.value)}
        >
          <option value="Pirata Informático">Modo: Pirata Informático</option>
          <option value="Senior Cínico">Modo: Senior Cínico</option>
          <option value="Guerrero Medieval">Modo: Guerrero Medieval</option>
        </select>

        <textarea 
          className="w-full h-48 p-4 bg-gray-900 border border-green-500 rounded-md focus:outline-none"
          placeholder="Pegue su código aquí, Señor Frank..."
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <button 
          onClick={traducirCodigo}
          disabled={cargando}
          className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-md transition-all disabled:opacity-50"
        >
          {cargando ? "Procesando..." : "Traducir Lógica"}
        </button>

        {respuesta && (
          <div className="mt-8 p-6 bg-gray-900 border-l-4 border-green-500 rounded-r-md">
            <h3 className="text-white font-bold mb-4">Resultado:</h3>
            <p className="whitespace-pre-wrap">{respuesta}</p>
          </div>
        )}
      </div>
    </main>
  );
}
\`\`\`

---
*Fin del reporte.*