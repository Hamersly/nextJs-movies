import { Metadata } from 'next';
import { ContentList } from '@/components/ContentList/ContentList';

interface IProps {
  params: Promise<{
    query: string;
  }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { query } = await params;
  const title = `Поиск: ${query}`;
  const description = `Результаты поиска по запросу "${query}"`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function Page({ params }: IProps) {
  const { query } = await params;
  return (
    <>
      <ContentList search={query} />
    </>
  );
}
