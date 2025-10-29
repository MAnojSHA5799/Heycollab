import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'https://heycollab.onrender.com' });

const Section = ({ title, children }) => (
  <div style={{ background:'#FDFDFE', border:'1px solid #eee', borderRadius:12, padding:16, marginBottom:16 }}>
    <h3 style={{ marginTop:0, marginBottom:12, color:'#1F1F1F' }}>{title}</h3>
    {children}
  </div>
);

const pill = (text, ok) => (
  <span style={{ padding:'2px 8px', borderRadius:999, fontSize:12, background: ok ? '#36CFC9' : '#EDE9FE', color: ok ? '#0F172A' : '#7B61FF' }}>{text}</span>
);

export default function AdminDashboard() {
  const [data, setData] = useState({ sellers: [], creators: [], products: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true); setError('');
      const res = await api.get('/api/admin/all');
      setData(res.data);
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to load');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const approve = async (type, id) => {
    try {
      setError('');
      if (type === 'creator') await api.patch(`/api/creators/${id}/approve`);
      if (type === 'seller') await api.patch(`/api/sellers/${id}/approve`);
      if (type === 'product') await api.patch(`/api/products/${id}/approve`);
      await load();
    } catch (e) {
      setError(e.response?.data?.error || 'Approve failed');
    }
  };

  return (
    <div style={{ maxWidth:1100, margin:'24px auto', padding:'0 16px' }}>
      <h2 style={{ color:'#4B8CF5', marginBottom:16 }}>Admin Dashboard</h2>
      {error && <div style={{ color:'#FF5681', marginBottom:12 }}>{error}</div>}
      {loading && <div>Loading…</div>}

      <Section title="Creators">
        <div style={{ display:'grid', gap:8 }}>
          {data.creators.map(c => (
            <div key={c._id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', padding:12, borderRadius:8, border:'1px solid #eee' }}>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <div style={{ fontWeight:600 }}>{c.name}</div>
                <div style={{ color:'#6b7280' }}>{c.email}</div>
                {pill(c.approved ? 'Approved' : 'Pending', c.approved)}
              </div>
              {!c.approved && (
                <button onClick={() => approve('creator', c._id)} style={{ background:'#6A4CF3', color:'#fff', border:'none', padding:'8px 12px', borderRadius:8 }}>Approve</button>
              )}
            </div>
          ))}
          {data.creators.length === 0 && <div style={{ color:'#6b7280' }}>No creators yet.</div>}
        </div>
      </Section>

      <Section title="Sellers">
        <div style={{ display:'grid', gap:8 }}>
          {data.sellers.map(s => (
            <div key={s._id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', padding:12, borderRadius:8, border:'1px solid #eee' }}>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <div style={{ fontWeight:600 }}>{s.storeName || s.ownerName || 'Seller'}</div>
                <div style={{ color:'#6b7280' }}>{s.businessEmail}</div>
                {pill(s.approved ? 'Approved' : 'Pending', s.approved)}
              </div>
              {!s.approved && (
                <button onClick={() => approve('seller', s._id)} style={{ background:'#6A4CF3', color:'#fff', border:'none', padding:'8px 12px', borderRadius:8 }}>Approve</button>
              )}
            </div>
          ))}
          {data.sellers.length === 0 && <div style={{ color:'#6b7280' }}>No sellers yet.</div>}
        </div>
      </Section>

      <Section title="Products">
        <div style={{ display:'grid', gap:8 }}>
          {data.products.map(p => (
            <div key={p._id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', padding:12, borderRadius:8, border:'1px solid #eee' }}>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <div style={{ fontWeight:600 }}>{p.name}</div>
                <div style={{ color:'#6b7280' }}>{p.type || '—'} · ₹{p.price}</div>
                {pill(p.approved ? 'Approved' : 'Pending', p.approved)}
              </div>
              {!p.approved && (
                <button onClick={() => approve('product', p._id)} style={{ background:'#6A4CF3', color:'#fff', border:'none', padding:'8px 12px', borderRadius:8 }}>Approve</button>
              )}
            </div>
          ))}
          {data.products.length === 0 && <div style={{ color:'#6b7280' }}>No products yet.</div>}
        </div>
      </Section>
    </div>
  );
}


