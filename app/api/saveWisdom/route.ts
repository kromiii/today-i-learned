import { NextResponse } from 'next/server';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseApp } from '../../../libs/firebase/config';

export async function POST(request: Request) {
  const { title, description } = await request.json();

  try {
    const db = getFirestore(firebaseApp);
    const docRef = await addDoc(collection(db, "wisdoms"), {
      title,
      description,
      createdAt: new Date()
    });

    return NextResponse.json({ message: 'Wisdom saved successfully', id: docRef.id });
  } catch (error) {
    console.error('Error saving wisdom:', error);
    return NextResponse.json({ message: 'Error saving wisdom' }, { status: 500 });
  }
}
