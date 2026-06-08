import { Metadata } from 'next';
import { ContentList } from '@/components/ContentList/ContentList';

interface IProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug === 'movie' ? 'Фильмы' : slug === 'tv' ? 'Сериалы' : '';
  const description =
    slug === 'movie'
      ? 'Смотрите популярные фильмы. Большая коллекция кино на любой вкус.'
      : slug === 'tv'
        ? 'Смотрите популярные сериалы. Лучшие сериалы мира.'
        : '';
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function Page({ params }: IProps) {
  const { slug } = await params;
  return (
    <>
      <ContentList format={slug} />
    </>
  );
}
