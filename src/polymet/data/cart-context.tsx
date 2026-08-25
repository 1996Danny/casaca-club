import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Jersey, SizeCode, VersionId } from "@/polymet/data/jerseys-data";

export interface CartLine {
  lineId: string;
  jersey: Jersey;
  size: SizeCode;
  versionId: VersionId;
  quantity: number;
}

interface AddItemInput {
  jersey: Jersey;
  size: SizeCode;
  versionId: VersionId;
  quantity?: number;
}

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddItemInput) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function lineKey(jerseyId: string, size: SizeCode, versionId: VersionId) {
  return `${jerseyId}__${size}__${versionId}`;
}

function unitPrice(jersey: Jersey, versionId: VersionId) {
  const version = jersey.versions.find((v) => v.id === versionId);
  return jersey.price + (version?.priceDelta ?? 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    ({ jersey, size, versionId, quantity = 1 }: AddItemInput) => {
      const id = lineKey(jersey.id, size, versionId);
      setLines((prev) => {
        const existing = prev.find((line) => line.lineId === id);
        if (existing) {
          return prev.map((line) =>
            line.lineId === id
              ? { ...line, quantity: line.quantity + quantity }
              : line
          );
        }
        return [...prev, { lineId: id, jersey, size, versionId, quantity }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((line) => line.lineId !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) {
        return prev.filter((line) => line.lineId !== lineId);
      }
      return prev.map((line) =>
        line.lineId === lineId ? { ...line, quantity } : line
      );
    });
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () =>
      lines.reduce(
        (sum, line) =>
          sum + unitPrice(line.jersey, line.versionId) * line.quantity,
        0
      ),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      isOpen,
      itemCount,
      subtotal,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      lines,
      isOpen,
      itemCount,
      subtotal,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

export function getUnitPrice(jersey: Jersey, versionId: VersionId) {
  return unitPrice(jersey, versionId);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}
