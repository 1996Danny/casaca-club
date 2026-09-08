import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangleIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutFailurePage() {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => setIsRetrying(false), 1200);
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center sm:py-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangleIcon className="h-8 w-8 text-destructive" />
      </div>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        No pudimos procesar tu pago
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Mercado Pago rechazó la transacción. Esto puede pasar por fondos
        insuficientes, datos incorrectos o un problema temporal. No te
        preocupes, no se realizó ningún cargo.
      </p>

      <div className="mt-8 flex w-full flex-col gap-3">
        <Button
          size="lg"
          className="gap-2"
          disabled={isRetrying}
          onClick={handleRetry}
        >
          {isRetrying ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <RotateCcwIcon className="h-4 w-4" />
          )}
          {isRetrying ? "Reintentando..." : "Reintentar pago"}
        </Button>
        <Button variant="outline" size="lg" className="bg-card" asChild>
          <Link to="/">Volver a la tienda</Link>
        </Button>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        ¿Necesitás ayuda? Escribinos a{" "}
        <a href="mailto:hola@casacaclub.com" className="text-primary underline-offset-2 hover:underline">
          hola@casacaclub.com
        </a>
      </p>
    </div>
  );
}
