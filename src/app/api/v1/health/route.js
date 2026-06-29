import { success } from '@/lib/response';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

export async function GET(request) {
  const url = new URL(request.url);
  const debug = url.searchParams.get('debug') === '1';

  const base = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    firebase: !!(adminDb && adminAuth),
  };

  if (debug) {
    base.env = {
      hasProjectId: !!process.env.FIREBASE_ADMIN_PROJECT_ID,
      hasClientEmail: !!process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.FIREBASE_ADMIN_PRIVATE_KEY,
      privateKeyLength: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.length || 0,
      privateKeyStart: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.substring(0, 30) || '',
      hasResendKey: !!process.env.RESEND_API_KEY,
    };
  }

  return success(base);
}
