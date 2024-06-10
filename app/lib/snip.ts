/**
 * Snips text to a certain length
 * @param text text to snip
 * @param length amount of characters before snipping
 * @returns snipped text
 */
export function snip(text: string, length: number): string {
  if (text.length > length) {
    return text.substring(0, length) + "..."
  }
  return text
}
