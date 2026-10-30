import React from 'react';

export const metadata = {
  title: 'Next.js + Supabase Auth',
  description: 'Tela de login completa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#f5f5f7' }}>
        {children}
      </body>
    </html>
  );
}
