'use client';
export default function getId(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/\d+\/$/);
  return match ? match[0].replace('/', '') : null;
}
