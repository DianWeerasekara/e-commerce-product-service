export function generateSku(name: string): string {
  const prefix = name.trim().replace(/\s+/g, '').substring(0, 3).toUpperCase();

  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');

  const random = Math.floor(1000 + Math.random() * 9000);

  return `${prefix}${month}${day}${random}`;
}
