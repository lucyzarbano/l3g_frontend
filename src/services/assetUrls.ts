const imageUrls = import.meta.glob('../assets/img/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

export function resolveContentImage(src: string): string {
  if (!src || /^(https?:)?\/\//.test(src) || src.startsWith('data:')) {
    return src
  }

  const normalizedSrc = src
    .replace(/^\/+/, '')
    .replace(/^src\/assets\/img\//, '')
    .replace(/^assets\/img\//, '')

  return imageUrls[`../assets/img/${normalizedSrc}`] ?? src
}

