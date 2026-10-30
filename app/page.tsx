import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '16px' }}>
      <h1>Bem-vindo à Aplicação</h1>
      <p>Clique abaixo para acessar o sistema de autenticação.</p>
      <Link href="/login" style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
        Ir para a Tela de Login
      </Link>
    </div>
  );
}
