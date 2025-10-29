import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'https://heycollab.onrender.com' });

export default function CreatorDashboard() {
  const creatorId = localStorage.getItem('hey_creator_id');
  const [creator, setCreator] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true); setError('');
        if (!creatorId) return;
        const res = await api.get(`/api/creators/${creatorId}`);
        setCreator(res.data);
      } catch (e) {
        setError(e.response?.data?.error || 'Failed to load');
      } finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin:'24px auto', padding:'0 16px' }}>
      <h2 style={{ color:'#4B8CF5', marginBottom:16 }}>Creator Dashboard</h2>
      {error && <div style={{ color:'#FF5681', marginBottom:12 }}>{error}</div>}
      {loading && <div>Loading…</div>}
      {creator && (
        <div style={{ background:'#fff', border:'1px solid #eee', padding:12, borderRadius:8, marginBottom:16 }}>
          <div style={{ fontWeight:600 }}>{creator.name}</div>
          <div style={{ color:'#6b7280' }}>{creator.email}</div>
          <div style={{ marginTop:6 }}>
            <span style={{ padding:'2px 8px', borderRadius:999, fontSize:12, background: creator.approved ? '#36CFC9' : '#EDE9FE', color:'#0F172A' }}>{creator.approved ? 'Approved' : 'Pending approval'}</span>
          </div>
          <div style={{ marginTop:6, color:'#6b7280' }}>Category: {creator.nicheCategory} · City: {creator.city}, {creator.state}</div>
        </div>
      )}

      <div style={{ background:'#FDFDFE', border:'1px solid #eee', borderRadius:12, padding:16 }}>
        <h3 style={{ marginTop:0, marginBottom:12 }}>Coming soon</h3>
        <div style={{ color:'#6b7280' }}>
          - Link product videos per platform (Instagram/YouTube/Facebook)
          <br/>- Track referrals, cashback points, and engagement metrics
        </div>
      </div>
    </div>
  );
}


