import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { db } from '../services/firebase';
import { collection, query, where, onSnapshot, orderBy, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { sanitizeString } from '../utils/appUtils';

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

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userEntries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(userEntries);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addEntry = async ({ title, content, date, feeling }) => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) return;

    await addDoc(collection(db, 'entries'), {
      userEmail,
      title: sanitizeString(title),
      content: sanitizeString(content),
      feeling: feeling || '',
      date: serverTimestamp(),
    });
  };

  const deleteEntry = async (id) => { if (!id) return; await deleteDoc(doc(db, 'entries', id)); };

  return (
    <EntriesContext.Provider value={{ entries, loading, addEntry, deleteEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
