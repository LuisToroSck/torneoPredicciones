import { FirebaseApp, FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebase.config';

function hasValue(value: string): boolean {
  return value.trim().length > 0;
}

export function isFirebaseConfigured(): boolean {
  return (
    hasValue(firebaseConfig.apiKey) &&
    hasValue(firebaseConfig.authDomain) &&
    hasValue(firebaseConfig.projectId) &&
    hasValue(firebaseConfig.appId)
  );
}

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error('Completa la configuracion de Firebase en src/app/firebase/firebase.config.ts');
  }

  return getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig as FirebaseOptions);
}

export function getFirestoreDb(): Firestore {
  return getFirestore(getFirebaseApp());
}
