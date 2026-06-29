import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let adminDb = null;
let adminAuth = null;

try {
  if (!process.env.FIREBASE_ADMIN_PROJECT_ID) {
    throw new Error('Firebase Admin credentials not configured');
  }

  const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      });

  adminDb = getFirestore(app);
  adminAuth = getAuth(app);
} catch (e) {
  console.warn('Firebase Admin not initialized:', e.message);
}

export { adminDb, adminAuth };
