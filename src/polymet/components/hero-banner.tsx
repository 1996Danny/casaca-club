import { Button } from "@/components/ui/button";
import { ArrowRightIcon, SparkleIcon } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop"
          alt="Estudio de la boutique"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10" />
      </div>

      <div className="relative mx-auto flex min-h-[480px] max-w-7xl flex-col items-start justify-center gap-5 px-6 py-20 sm:min-h-[560px] sm:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <SparkleIcon className="h-3.5 w-3.5 text-primary" />
          Colección en pequeños lotes
        </span>

        <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          Piezas con carácter, hechas para durar
        </h1>

        <p className="max-w-md text-base text-muted-foreground sm:text-lg">
          Curamos una selección pequeña de ropa, calzado y accesorios de
          talleres artesanales locales. Calidad honesta, sin sobreproducción.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Button size="lg" className="gap-2" asChild>
            <a href="#catalogo">
              Ver catálogo
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="bg-card/80 backdrop-blur-sm" asChild>
            <a href="#catalogo">Nuestra historia</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
