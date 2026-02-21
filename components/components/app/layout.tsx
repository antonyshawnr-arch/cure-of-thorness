/ app/layout.tsx
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css'; // Tailwind + Shadcn

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <nav className="bg-primary p-4 text-white flex justify-between">
            <h1>Health Vault</h1>
            <select id="lang">
              <option value="en">English</option>
              <option value="ta">தமிழ்</option>
              <option value="ml">മലയാളം</option>
            </select>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
