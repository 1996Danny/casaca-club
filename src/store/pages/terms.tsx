import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Términos y Condiciones
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Condiciones de uso del sitio, de la compra y derechos del consumidor (Ley 24.240).
        </p>
      </header>

      <div className="flex flex-col gap-8">
        <article>
          <h2 className="text-lg font-semibold text-foreground">1. Objeto</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Casaca Club es una tienda de camisetas deportivas de selecciones nacionales. Este sitio
            permite explorar el catálogo, armar un carrito de compras y pagar a través de Mercado Pago.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-foreground">2. Aceptación</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Al usar el catálogo, el carrito o el checkout de Mercado Pago, el usuario acepta estos
            Términos y Condiciones y la{" "}
            <Link to="/privacidad" className="text-primary underline-offset-2 hover:underline">
              Política de Privacidad
            </Link>
            .
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-foreground">3. Precios y disponibilidad</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Los precios se muestran en pesos argentinos (ARS) y pueden cambiar sin aviso previo. El
            stock de talles se indica en cada camiseta y puede agotarse antes de confirmar la compra.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-foreground">4. Proceso de compra</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            El carrito permite agregar, modificar la cantidad y eliminar camisetas antes de pagar. Al
            confirmar, se redirige a Mercado Pago (modo de prueba/sandbox) para procesar el pago; no se
            cobra dinero real.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-foreground">5. Propiedad intelectual</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            El código fuente se distribuye bajo licencia{" "}
            <a
              href="https://www.gnu.org/licenses/gpl-3.0.es.html"
              rel="license noopener noreferrer"
              target="_blank"
              className="text-primary underline-offset-2 hover:underline"
            >
              GNU GPL v3.0
            </a>
            .
          </p>
        </article>

        <article
          id="arrepentimiento"
          className="rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground">
            6. Derecho de Arrepentimiento (Ley 24.240, art. 34) y garantía
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            En las compras a distancia, el consumidor tiene derecho a revocar la aceptación durante el
            plazo de <strong className="text-foreground">10 días corridos</strong> contados desde la
            entrega del producto, sin costo ni responsabilidad alguna, conforme a la Resolución 424/2020
            de la Secretaría de Comercio.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Los productos cuentan además con garantía legal por defectos de fabricación (art. 11, Ley
            24.240), a ejercer dentro de los 6 meses de la entrega, escribiendo al correo de contacto.
          </p>

          <Button
            type="button"
            className="mt-4"
            onClick={() => setMensajeVisible(true)}
          >
            Botón de Arrepentimiento
          </Button>

          {mensajeVisible && (
            <p
              role="status"
              aria-live="polite"
              className="mt-3 rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground"
            >
              Solicitud de arrepentimiento simulada. En un sitio en producción, esto generaría un ticket
              dentro de los 10 días corridos de la entrega y se confirmaría por correo a{" "}
              <a href="mailto:hola@casacaclub.com" className="underline underline-offset-2">
                hola@casacaclub.com
              </a>
              , sin costo para quien compra (Ley 24.240, art. 34).
            </p>
          )}
        </article>
      </div>
    </div>
  );
}
