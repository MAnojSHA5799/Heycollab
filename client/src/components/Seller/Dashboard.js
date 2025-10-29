import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'https://heycollab.onrender.com' });

export default function SellerDashboard() {
  const sellerId = localStorage.getItem('hey_seller_id');
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', type: '', price: '', description: '', designImage: null });

  const load = async () => {
    try {
      setError('');
      if (!sellerId) return;
      const [s, p] = await Promise.all([
        api.get(`/api/sellers/${sellerId}`),
        api.get(`/api/products/by-seller/${sellerId}`)
      ]);
      setSeller(s.data);
      setProducts(p.data);
    } catch (e) { setError(e.response?.data?.error || 'Failed to load'); }
  };

  useEffect(() => { load(); }, []);

  const onAdd = async (e) => {
    e.preventDefault();
    try {
      setAdding(true); setError('');
      const fd = new FormData();
      fd.append('sellerId', sellerId);
      fd.append('name', form.name);
      fd.append('type', form.type);
      fd.append('price', form.price);
      fd.append('description', form.description);
      if (form.designImage) fd.append('designImage', form.designImage);
      await api.post('/api/products/add', fd);
      setForm({ name: '', type: '', price: '', description: '', designImage: null });
      await load();
    } catch (e) { setError(e.response?.data?.error || 'Add failed'); }
    finally { setAdding(false); }
  };

  return (
    <div style={{ maxWidth: 1100, margin:'24px auto', padding:'0 16px' }}>
      <h2 style={{ color:'#4B8CF5', marginBottom:16 }}>Seller Dashboard</h2>
      {error && <div style={{ color:'#FF5681', marginBottom:12 }}>{error}</div>}
      {seller && (
        <div style={{ background:'#fff', border:'1px solid #eee', padding:12, borderRadius:8, marginBottom:16 }}>
          <div style={{ fontWeight:600 }}>{seller.storeName || seller.ownerName}</div>
          <div style={{ color:'#6b7280' }}>{seller.businessEmail}</div>
          <div style={{ marginTop:6 }}>
            <span style={{ padding:'2px 8px', borderRadius:999, fontSize:12, background: seller.approved ? '#36CFC9' : '#EDE9FE', color:'#0F172A' }}>{seller.approved ? 'Approved' : 'Pending approval'}</span>
          </div>
        </div>
      )}

      <div style={{ background:'#FDFDFE', border:'1px solid #eee', borderRadius:12, padding:16, marginBottom:16 }}>
        <h3 style={{ marginTop:0, marginBottom:12 }}>Add Product</h3>
        <form onSubmit={onAdd} style={{ display:'grid', gap:8 }}>
          <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required />
          <input placeholder="Type" value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})} />
          <input placeholder="Price" type="number" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} required />
          <textarea placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
          <input type="file" accept="image/*" onChange={(e)=>setForm({...form,designImage:e.target.files?.[0]||null})} />
          <button disabled={adding} style={{ background:'#6A4CF3', color:'#fff', border:'none', padding:'8px 12px', borderRadius:8 }}>{adding?'Submitting…':'Submit for approval'}</button>
        </form>
      </div>

      <div style={{ background:'#FDFDFE', border:'1px solid #eee', borderRadius:12, padding:16 }}>
        <h3 style={{ marginTop:0, marginBottom:12 }}>My Products</h3>
        <div style={{ display:'grid', gap:8 }}>
          {products.map(p => (
            <div key={p._id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', padding:12, borderRadius:8, border:'1px solid #eee' }}>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <div style={{ fontWeight:600 }}>{p.name}</div>
                <div style={{ color:'#6b7280' }}>{p.type || '—'} · ₹{p.price}</div>
                <span style={{ padding:'2px 8px', borderRadius:999, fontSize:12, background: p.approved ? '#36CFC9' : '#EDE9FE' }}>{p.approved? 'Approved':'Pending'}</span>
              </div>
            </div>
          ))}
          {products.length===0 && <div style={{ color:'#6b7280' }}>No products yet.</div>}
        </div>
      </div>
    </div>
  );
}


