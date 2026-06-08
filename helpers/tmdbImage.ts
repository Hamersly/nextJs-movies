// TMDB предоставляет изображения в разных размерах, которые задаются
// сегментом пути: https://image.tmdb.org/t/p/w342/abc.jpg
// На клиенте выбираем размер, достаточный для текущего контекста отображения,
// чтобы не грузить оригиналы (original) — это экономит до 80% трафика.

const BASE = 'https://image.tmdb.org/t/p';

type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780';
type BackdropSize = 'w300' | 'w780' | 'w1280';

export function posterSrc(path: string | undefined, size: PosterSize = 'w500'): string | undefined {
  if (!path) return undefined;
  return `${BASE}/${size}${path}`;
}

export function backdropSrc(
  path: string | undefined,
  size: BackdropSize = 'w1280',
): string | undefined {
  if (!path) return undefined;
  return `${BASE}/${size}${path}`;
}
