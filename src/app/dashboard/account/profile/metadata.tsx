import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | Lemara Commercial',
  description: 'Manage your profile information and settings',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
