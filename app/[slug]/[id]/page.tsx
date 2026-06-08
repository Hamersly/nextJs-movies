import { Metadata } from 'next';
import { Detail } from '@/components/Detail/Detail';

interface IProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

// Запрашивает реальный заголовок из TMDB для тега <title> и Open Graph.
// slug — формат (movie/tv), id — числовой ID из пути /[slug]/[id].
export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { slug, id } = await params;
  const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${slug}/${id}?api_key=${API_KEY}&language=ru-RU`,
    );
    if (res.ok) {
      const data = await res.json();
      const title = slug === 'movie' ? data.title : data.name;
      return {
        title,
        description: `Информация о фильме или сериале: ${title}`,
        openGraph: { title, description: `Информация о фильме или сериале: ${title}` },
      };
    }
  } catch (e) {
    console.error('generateMetadata TMDB fetch failed:', e);
  }
  return { title: 'Просмотр' };
}

export default async function Page() {
  return <Detail />;
}
