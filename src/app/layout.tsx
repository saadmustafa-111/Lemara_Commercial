// Import CSS for fonts instead of using next/font/google
import './globals.css';
import Providers from '@/components/common/Providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lemara Commercial',
  description: 'Commercial real estate platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-outfit dark:bg-gray-900" suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
