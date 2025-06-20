const API = 'http://localhost:3000';

export async function register(email: string, password: string) {
  const res = await fetch(`${API}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API}/user/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res;
}
