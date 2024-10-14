export function truncateString(str: string, maxLength: number): string {
  if (getStringLength(str) <= maxLength) return str;

  let truncated = "";
  let currentLength = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const charLength = getCharLength(char);

    if (currentLength + charLength > maxLength - 1) {
      return truncated + "…";
    }

    truncated += char;
    currentLength += charLength;
  }

  return truncated;
}

function getStringLength(str: string): number {
  let length = 0;
  for (let i = 0; i < str.length; i++) {
    length += getCharLength(str.charAt(i));
  }
  return length;
}

function getCharLength(char: string): number {
  const code = char.codePointAt(0) || 0;
  if (code <= 0x7f) return 1;
  if (code <= 0x7ff) return 2;
  if (code <= 0xffff) return 3;
  return 4;
}
