import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({ baseURL: 'https://heycollab.onrender.com' });

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true); setError('');
        const res = await api.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (e) { setError(e.response?.data?.error || 'Failed to load'); }
      finally { setLoading(false); }
    };
    load();
  }, [id]);

  return (
    <div style={{ maxWidth: 900, margin:'24px auto', padding:'0 16px' }}>
      {error && <div style={{ color:'#FF5681', marginBottom:12 }}>{error}</div>}
      {loading && <div>Loading…</div>}
      {product && (
        <div style={{ background:'#fff', border:'1px solid #eee', padding:16, borderRadius:12 }}>
          <h2 style={{ color:'#1F1F1F', marginTop:0 }}>{product.name}</h2>
          <div style={{ color:'#6b7280', marginBottom:8 }}>{product.type || '—'} · ₹{product.price}</div>
          {product.designImage && (
            <img alt={product.name} src={`https://heycollab.onrender.com/${product.designImage}`} style={{ maxWidth:'100%', borderRadius:8, marginBottom:12 }} />
          )}
          <p style={{ color:'#1F1F1F' }}>{product.description || '—'}</p>
          <div style={{ marginTop:12, color:'#6b7280' }}>Status: {product.approved ? 'Approved' : 'Pending approval'}</div>
        </div>
      )}
    </div>
  );
}


