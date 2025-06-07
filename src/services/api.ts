const API_URL = 'http://localhost:4000/api';

export async function fetchDeals(filters: any) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}/deals?${params}`);
  return res.json();
}

export async function postValuation(data: any) {
  const res = await fetch(`${API_URL}/valuation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchPortfolio() {
  const res = await fetch(`${API_URL}/portfolio`);
  return res.json();
}

export async function login(role: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
  return res.json();
}
// TODO: Add error handling 