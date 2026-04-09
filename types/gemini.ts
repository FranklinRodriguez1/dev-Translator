export interface GeminiRequest {
  code: string;
  personality: string;
}

export interface GeminiResponse {
  text: string;
}

export interface ApiError {
  error: string;
}
