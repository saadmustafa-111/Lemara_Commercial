
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext'; 
import { GroupContextProvider } from '@/context/GroupsContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}