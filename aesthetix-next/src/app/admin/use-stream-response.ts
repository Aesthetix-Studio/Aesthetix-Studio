import { useState, useRef, useCallback } from "react";

/**
 * Reads a streaming text/event-stream response and accumulates the text.
 * Returns the live-updating text and a startStream function.
 */
export function useStreamResponse() {
  const [text, setText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const startStream = useCallback(async (url: string, body: object, headers?: Record<string, string>) => {
    // Abort any previous stream
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setText("");
    setStreaming(true);
    setError("");

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setText(accumulated);
      }

      return accumulated;
    } catch (err: any) {
      if (err.name === "AbortError") return text; // user cancelled
      setError(err.message || "Stream failed");
      throw err;
    } finally {
      setStreaming(false);
    }
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setStreaming(false);
  }, []);

  return { text, streaming, error, startStream, cancel, setText, setError };
}

