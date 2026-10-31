import { formatPrice } from "@/lib/pricing-utils"

export type NumberFormat = "integer" | "compact" | "price"

const MILLION = 1_000_000
const THOUSAND = 1_000

export function formatCompactNumber(value: number): string {
  if (value >= MILLION) return (value / MILLION).toFixed(1) + "M"
  if (value >= THOUSAND) return (value / THOUSAND).toFixed(1) + "k"
  return Math.round(value).toLocaleString("fr-FR")
}

export function formatNumber(value: number, format: NumberFormat): string {
  if (format === "compact") return formatCompactNumber(value)
  if (format === "price") return formatPrice(value)
  return Math.round(value).toLocaleString("fr-FR")
}
