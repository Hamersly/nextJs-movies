import {Metadata} from 'next';
import {Detail} from '@/components/Detail/detail';

interface IProps {
  params: {
    id: string,
  }
}

export async function generateMetadata({params: {id}}: IProps): Promise<Metadata> {
  return {
    title: id,
    description: '',
  };
}

export default async function Page() {
  return (
    <>
      <Detail/>
    </>
  );
}