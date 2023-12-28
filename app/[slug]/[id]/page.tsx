import {Metadata} from 'next';
import {Detail} from '@/components/Detail/detail';
import {getDetail} from '@/helpers/getContent';

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

export default async function Page({searchParams}: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const {format, id} = searchParams;
  const results = await getDetail(format, id);
  return (
    <>
      <Detail data={results}/>
    </>
  );
}