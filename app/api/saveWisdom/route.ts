import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseApp, getCurrentUser } from '@/libs/firebase/firebase-admin';

export async function POST(request: Request) {
  const { title, description } = await request.json();
  const user = await getCurrentUser();

  try {
    const db = getFirestore(firebaseApp);
    const docRef = await db.collection('wisdoms').add({
      title,
      description,
      userId: user?.uid,
      createdAt: new Date()
    });

    return NextResponse.json({ message: 'Wisdom saved successfully', id: docRef.id });
  } catch (error) {
    console.error('Error saving wisdom:', error);
    return NextResponse.json({ message: 'Error saving wisdom' }, { status: 500 });
  }
}
