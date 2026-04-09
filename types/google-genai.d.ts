declare module "@google/genai" {
  export interface GenerateContentOptions {
    model: string;
    contents: string;
  }

  export interface GenerateContentResponse {
    text: string;
  }

  export class GoogleGenAI {
    constructor(options: { apiKey: string });
    models: {
      generateContent(options: GenerateContentOptions): Promise<GenerateContentResponse>;
    };
  }
}
