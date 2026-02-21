'use client';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';

export default function EmergencyView({ userId }: { userId: string }) {
  const [data, setData] = useState({ blood: '', allergies: [], contacts: [] });

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(doc(db, 'users', userId));
      setData(docSnap.data() || {});
    };
    fetchData();
  }, [userId]);

  return (
    <div className="bg-red-500 text-white p-4">
      <h2>Blood: {data.blood}</h2>
      <ul>Allergies: {data.allergies.join(', ')}</ul>
      <ul>Contacts: {data.contacts.map(c => c.name).join(', ')}</ul>
    </div>
  );
}
