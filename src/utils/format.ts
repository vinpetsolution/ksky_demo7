/**
 * Format number with comma as thousands separator.
 * @example formatNumber(250000) => "250,000"
 */
export function formatNumber(value: number): string {
    return value.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
}

/** Alias for ranking bet amounts. */
export const formatMoney = formatNumber;

/**
 * Mask the latter half of a name with asterisks.
 * @example maskName("GoldAgent") => "Gold*****"
 */
export function maskName(name: string): string {
    if (!name) return "";
    if (name.length <= 2) return `${name[0]}*`;
    const visible = Math.ceil(name.length / 2);
    return name.slice(0, visible) + "*".repeat(name.length - visible);
}
