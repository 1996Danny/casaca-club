import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2Icon, PackageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/store/data/cart-context";

interface PedidoGuardado {
  items: {
    nombre: string;
    talle: string;
    version: string;
    cantidad: number;
    subtotal: number;
  }[];
  subtotal: number;
}

const VERSION_LABEL: Record<string, string> = {
  hincha: "Hincha",
  jugador: "Jugador",
};

function leerUltimoPedido(): PedidoGuardado | null {
  try {
    const guardado = sessionStorage.getItem("casacaClub.ultimoPedido");
    return guardado ? (JSON.parse(guardado) as PedidoGuardado) : null;
  } catch {
    return null;
  }
}

export default function CheckoutSuccessPage() {
  const pedido = useMemo(() => leerUltimoPedido(), []);
  const fecha = new Date().toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 sm:py-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2Icon className="h-8 w-8 text-primary" />
      </div>

      <h1 className="mt-6 text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        ¡Gracias por tu compra!
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Tu pago fue confirmado por Mercado Pago. Te enviaremos un correo con
        el seguimiento del envío.
      </p>

      {pedido ? (
        <div className="mt-8 w-full rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Fecha
          </p>
          <p className="font-medium text-foreground">{fecha}</p>

          <Separator className="my-4" />

          <div className="flex flex-col gap-3">
            {pedido.items.map((item, indice) => (
              <div
                key={`${item.nombre}-${item.talle}-${item.version}-${indice}`}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2 text-foreground">
                  <PackageIcon className="h-4 w-4 text-muted-foreground" />
                  {item.nombre}
                  <span className="text-muted-foreground">
                    · Talle {item.talle} · {VERSION_LABEL[item.version] ?? item.version} × {item.cantidad}
                  </span>
                </div>
                <span className="font-medium text-foreground">
                  {formatPrice(item.subtotal)}
                </span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between text-base font-semibold text-foreground">
            <span>Total</span>
            <span>{formatPrice(pedido.subtotal)}</span>
          </div>
        </div>
      ) : null}

      <Button asChild size="lg" className="mt-8 w-full">
        <Link to="/">Volver a la tienda</Link>
      </Button>
    </div>
  );
}
