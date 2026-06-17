import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { QuoteRequest } from './types';

const firebaseConfig = {
  projectId: "gen-lang-client-0159432162",
  appId: "1:472664199638:web:a7fdd009e34c03deef9477",
  apiKey: "AIzaSyCYUZy_oSQEDlQwu0L73qr5Z3SGJw69G3I",
  authDomain: "gen-lang-client-0159432162.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-6fff6d13-3cb4-42f7-af32-b6bc5d6f7eeb",
  storageBucket: "gen-lang-client-0159432162.firebasestorage.app",
  messagingSenderId: "472664199638"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Save quote requests to Firestore
export async function saveQuoteRequest(request: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'quoteRequests'), {
      ...request,
      createdAt: Date.now(),
      status: 'Pendente'
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving quote request to Firestore:", error);
    throw error;
  }
}

// Get recent quote requests
export async function getRecentQuoteRequests(limitCount = 10): Promise<QuoteRequest[]> {
  try {
    const q = query(collection(db, 'quoteRequests'), orderBy('createdAt', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    const requests: QuoteRequest[] = [];
    querySnapshot.forEach((doc) => {
      requests.push({
        id: doc.id,
        ...doc.data()
      } as QuoteRequest);
    });
    return requests;
  } catch (error) {
    console.error("Error getting quote requests:", error);
    throw error;
  }
}
