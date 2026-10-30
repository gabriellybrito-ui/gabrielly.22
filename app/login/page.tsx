'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Login efetuado com sucesso! Redirecionando...' });
      // Aqui você pode adicionar o redirecionamento, ex: window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage({ type: 'error', text: 'Preencha todos os campos para se cadastrar.' });
      return;
    }
    setLoading(true);
    setMessage(null);

    const { error, data } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else if (data.user && data.session === null) {
      setMessage({ type: 'success', text: 'Cadastro realizado! Verifique seu e-mail para confirmação.' });
    } else {
      setMessage({ type: 'success', text: 'Conta criada e login efetuado com sucesso!' });
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Acessar Sistema</h2>
        <p style={styles.subtitle}>Entre com seus dados ou crie uma nova conta</p>

        {message && (
          <div style={{ ...styles.alert, backgroundColor: message.type === 'success' ? '#e6f4ea' : '#fce8e6', color: message.type === 'success' ? '#137333' : '#c5221f' }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>E-mail</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} placeholder="seu@email.com" />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Senha</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading} style={{ ...styles.button, backgroundColor: '#0070f3' }}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>

          <div style={styles.divider}>
            <span style={styles.dividerText}>ou</span>
          </div>

          <button type="button" onClick={handleSignUp} disabled={loading} style={{ ...styles.button, backgroundColor: '#34a853' }}>
            Criar Nova Conta
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '24px',
    textAlign: 'center' as const,
    color: '#333',
  },
  subtitle: {
    margin: '0 0 24px 0',
    fontSize: '14px',
    textAlign: 'center' as const,
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#444',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  alert: {
    padding: '12px',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '16px',
    textAlign: 'center' as const,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center' as const,
    color: '#aaa',
    margin: '10px 0',
  },
  dividerText: {
    width: '100%',
  }
};
