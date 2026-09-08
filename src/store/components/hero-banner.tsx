import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ShieldIcon } from "lucide-react";
import { JERSEYS } from "@/store/data/jerseys-data";

const MARQUEE_IDS = [
  "arg-titular-2024",
  "bra-titular-2024",
  "fra-suplente-2024",
  "jpn-titular-2024",
];

export default function HeroBanner() {
  const marquee = MARQUEE_IDS.map((id) =>
    JERSEYS.find((j) => j.id === id)
  ).filter((j): j is (typeof JERSEYS)[number] => Boolean(j));

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://v3b.fal.media/files/b/0aa7cbff/Fna0o21esS6uc-QHM6NMY_SlcKLISZ.jpg"
          alt="Estadio de noche"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center gap-6 px-6 py-20 sm:min-h-[620px] sm:px-8">
        <div className="flex max-w-xl flex-col gap-5">
          <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <ShieldIcon className="h-3.5 w-3.5" />
            Licencia oficial · Ediciones limitadas
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Vestí los colores de tu selección
          </h1>

          <p className="max-w-md text-base text-muted-foreground sm:text-lg">
            Camisetas oficiales de selecciones nacionales: CONMEBOL, UEFA,
            resto del mundo y ediciones retro. Stock curado, entrega
            garantizada.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button size="lg" className="gap-2" asChild>
              <a href="#catalogo">
                Explorar Camisetas
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-card/70 backdrop-blur-sm"
              asChild
            >
              <a href="#catalogo">Ediciones Retro</a>
            </Button>
          </div>
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-2 sm:mt-10">
          {marquee.map((jersey) => (
            <div
              key={jersey.id}
              className="flex w-28 shrink-0 flex-col items-center gap-2 sm:w-36"
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-card/80 shadow-lg backdrop-blur-sm">
                <img
                  src={jersey.images.front}
                  alt={jersey.nation}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                <img
                  src={jersey.flag}
                  alt=""
                  className="h-3 w-[18px] rounded-[2px] object-cover ring-1 ring-border"
                />

                {jersey.nation}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
