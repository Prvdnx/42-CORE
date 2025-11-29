import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { db } from '../services/firebase';
import { collection, query, where, onSnapshot, orderBy, addDoc, deleteDoc, doc } from 'firebase/firestore';

const EntriesContext = createContext();

export const useEntries = () => useContext(EntriesContext);

export const EntriesProvider = ({ children }) => {
  const { user } = useUser();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setEntries([]); return; }

    const userEmail = user.primaryEmailAddress?.emailAddress;
    if (!userEmail) return;

    setLoading(true);
    const q = query(
      collection(db, 'entries'),
      where('userEmail', '==', userEmail),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userEntries = [];
      querySnapshot.forEach((d) => {
        const data = d.data();
        const date = data.date?.seconds
          ? new Date(data.date.seconds * 1000).toISOString().split('T')[0]
          : data.date;
        userEntries.push({ id: d.id, ...data, date });
      });
      setEntries(userEntries);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addEntry = async ({ title, content, date, feeling }) => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) return;
    const payload = {
      userEmail,
      title: title?.trim() || '',
      content: content?.trim() || '',
      feeling: feeling || '',
      // normalize to YYYY-MM-DD for consistent UI filtering & ordering
      date: date || new Date().toISOString().split('T')[0],
    };
    await addDoc(collection(db, 'entries'), payload);
  };

  const deleteEntry = async (id) => { if (!id) return; await deleteDoc(doc(db, 'entries', id)); };

  return (
    <EntriesContext.Provider value={{ entries, loading, addEntry, deleteEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
