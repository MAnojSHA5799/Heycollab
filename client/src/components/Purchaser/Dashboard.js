import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8000' });

export default function PurchaserDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true); setError('');
        const res = await api.get('/api/products/approved');
        setProducts(res.data);
      } catch (e) { setError(e.response?.data?.error || 'Failed to load'); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin:'24px auto', padding:'0 16px' }}>
      <h2 style={{ color:'#4B8CF5', marginBottom:16 }}>Browse Products</h2>
      {error && <div style={{ color:'#FF5681', marginBottom:12 }}>{error}</div>}
      {loading && <div>Loading…</div>}
      <div style={{ display:'grid', gap:12 }}>
        {products.map(p => (
          <div key={p._id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', padding:12, borderRadius:8, border:'1px solid #eee' }}>
            <div style={{ display:'flex', gap:12, alignItems:'center' }}>
              <div style={{ fontWeight:600 }}>{p.name}</div>
              <div style={{ color:'#6b7280' }}>{p.type || '—'} · ₹{p.price}</div>
            </div>
            <Link to={`/product/${p._id}`} style={{ background:'#36CFC9', color:'#0F172A', textDecoration:'none', padding:'8px 12px', borderRadius:8 }}>View</Link>
          </div>
        ))}
        {products.length===0 && !loading && <div style={{ color:'#6b7280' }}>No approved products yet.</div>}
      </div>
    </div>
  );
}


