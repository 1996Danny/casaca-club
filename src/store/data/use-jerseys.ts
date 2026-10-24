import { useEffect, useState } from "react";
import { Jersey } from "@/store/data/jerseys-data";

interface UseJerseysResult {
  jerseys: Jersey[];
  loading: boolean;
  error: string | null;
}

/* Fetch API: carga el catálogo desde /productos.json en tiempo de
   ejecución (nunca hardcodeado en el bundle). Es el mismo archivo que
   usa server/export-catalog.mjs como fuente de precios del backend, así
   que front y back siempre ven el mismo catálogo. */
export function useJerseys(): UseJerseysResult {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/productos.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Jersey[]) => {
        setJerseys(data);
        setLoading(false);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error("No se pudo cargar el catálogo:", err);
        setError("No se pudo cargar el catálogo. Probá recargar la página.");
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { jerseys, loading, error };
}
