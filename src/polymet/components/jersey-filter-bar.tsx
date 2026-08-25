import { SlidersHorizontalIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EDITIONS, SIZES } from "@/polymet/data/jerseys-data";
import { cn } from "@/lib/utils";

interface JerseyFilterBarProps {
  edition: string;
  onEditionChange: (value: string) => void;
  size: string;
  onSizeChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  resultCount: number;
}

export default function JerseyFilterBar({
  edition,
  onEditionChange,
  size,
  onSizeChange,
  sort,
  onSortChange,
  resultCount,
}: JerseyFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <SlidersHorizontalIcon className="h-4 w-4" />
          Filtrar
        </div>

        <Select value={edition} onValueChange={onEditionChange}>
          <SelectTrigger className="h-9 w-[150px] bg-secondary text-sm">
            <SelectValue placeholder="Edición" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las ediciones</SelectItem>
            {EDITIONS.map((e) => (
              <SelectItem key={e.id} value={e.id}>
                {e.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1.5">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Talle
          </span>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={size === "all" ? "default" : "outline"}
              className={cn("h-8 px-2.5", size !== "all" && "bg-secondary")}
              onClick={() => onSizeChange("all")}
            >
              Todos
            </Button>
            {SIZES.map((s) => (
              <Button
                key={s}
                size="sm"
                variant={size === s ? "default" : "outline"}
                className={cn("h-8 w-9 px-0", size !== s && "bg-secondary")}
                onClick={() => onSizeChange(s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span className="text-xs text-muted-foreground sm:hidden">
          {resultCount} resultados
        </span>
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="h-9 w-[170px] bg-secondary text-sm">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Más relevantes</SelectItem>
            <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
            <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
            <SelectItem value="newest">Novedades</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
