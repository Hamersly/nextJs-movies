import Link from 'next/link';
import {FC, ReactNode} from 'react';
import {linksStyles} from '@/components/Links/Links.styled';

interface IProps {
  href: string | object
  children: ReactNode
}

export const Links: FC<IProps> = ({href, children}) => {
  return (
    <Link href={href} style={linksStyles}>
      {children}
    </Link>
  );
};