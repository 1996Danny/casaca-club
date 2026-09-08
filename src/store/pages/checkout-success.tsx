import { Link } from "react-router-dom";
import { CheckCircle2Icon, PackageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/store/data/cart-context";

const MOCK_ORDER = {
  number: "TB-48213",
  date: new Date().toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }),
  items: [
    { name: "Vestido Lino Habana", quantity: 1, price: 89900 },
    { name: "Sandalias Cuero Terra", quantity: 1, price: 74900 },
  ],

  shipping: 0,
};

export default function CheckoutSuccessPage() {
  const subtotal = MOCK_ORDER.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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

      <div className="mt-8 w-full rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Número de orden
            </p>
            <p className="font-semibold text-foreground">
              {MOCK_ORDER.number}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Fecha
            </p>
            <p className="font-medium text-foreground">{MOCK_ORDER.date}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col gap-3">
          {MOCK_ORDER.items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2 text-foreground">
                <PackageIcon className="h-4 w-4 text-muted-foreground" />
                {item.name}
                <span className="text-muted-foreground">
                  × {item.quantity}
                </span>
              </div>
              <span className="font-medium text-foreground">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Envío</span>
          <span>{MOCK_ORDER.shipping === 0 ? "Gratis" : formatPrice(MOCK_ORDER.shipping)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-base font-semibold text-foreground">
          <span>Total</span>
          <span>{formatPrice(subtotal + MOCK_ORDER.shipping)}</span>
        </div>
      </div>

      <Button asChild size="lg" className="mt-8 w-full">
        <Link to="/">Volver a la tienda</Link>
      </Button>
    </div>
  );
}
