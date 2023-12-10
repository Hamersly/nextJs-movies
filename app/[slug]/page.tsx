import {Metadata} from 'next';
import {ContentList} from '@/components/ContentList/ContentList';

interface IProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({params: {slug}}: IProps): Promise<Metadata> {
  const title = slug === 'movie' ? 'Фильмы' : slug === 'tv' ? 'Сериалы' : '';
  return {
    title: title,
    description: '',
  };
}

export default async function Page({params: {slug}}: IProps) {
  return (
    <>
      <ContentList
        format={slug}
      />
    </>
  );
}