import './globals.css';
import type { Metadata } from 'next';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AuthProvider from '@/components/authProvider/AuthProvider';
import Navbar from '@/components/navbar/Navbar';
import Header from '@/components/header/Header';

export const metadata: Metadata = {
  title: 'Movies Hub',
  description: 'Track your movies',
  icons: {
    icon: "/public/assets/images/favicon.ico"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <UserProvider>
          <AuthProvider>
            <Header />
            {children}
            <Navbar />
          </AuthProvider>
        </UserProvider>
      </body>
    </html>
  )
}
