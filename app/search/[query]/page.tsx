import {Metadata} from 'next';
import {ContentList} from "@/components/ContentList/ContentList";

interface IProps {
  params: {
    query: string,
  }
}

export async function generateMetadata({params: {query}}: IProps): Promise<Metadata> {
  return {
    title: query,
    description: '',
  };
}

export default async function Page({params: {query}}: IProps) {
  return (
    <>
      <ContentList
        search={query}
      />
    </>
  );
}
