
<<<<<<< Updated upstream
import './globals.css';
import Providers from '@/components/common/Providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lemara Commercial',
  description: 'Commercial real estate platform',
};
=======
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext'; 
import { GroupContextProvider } from '@/context/GroupsContext'
>>>>>>> Stashed changes

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< Updated upstream
      <body className="font-outfit dark:bg-gray-900" suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
=======
      <body className="font-outfit dark:bg-gray-900">
        <AuthProvider> 
          <ThemeProvider>
            <SidebarProvider>
              <GroupContextProvider>
                {children}
              </GroupContextProvider>
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
>>>>>>> Stashed changes
      </body>
    </html>
  );
}