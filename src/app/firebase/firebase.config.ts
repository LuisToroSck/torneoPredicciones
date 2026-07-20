export interface FirebaseProjectConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface FirestoreCollectionsConfig {
  tablaPosiciones: string;
  tablaPosicionesMeta: string;
  ultimaActualizacionDoc: string;
}

export const firebaseConfig: FirebaseProjectConfig = {
  apiKey: 'AIzaSyB4-BUKnCY0fJlzdN2HlmYwvCaSFCv-L78',
  authDomain: 'mundial-1805a.firebaseapp.com',
  projectId: 'mundial-1805a',
  storageBucket: 'mundial-1805a.firebasestorage.app',
  messagingSenderId: '314455928168',
  appId: '1:314455928168:web:fdc5cd7f188c49390c7add'
};

// Pega aqui la configuracion de Firebase Web App desde:
// Firebase Console > Configuracion del proyecto > Tus apps > SDK setup and configuration
export const firestoreCollections: FirestoreCollectionsConfig = {
  // En tu captura aparece "tablaPosicion" en singular.
  // Si la coleccion real es "tablaPosiciones", cambia este valor.
  tablaPosiciones: 'tablaPosicion',
  tablaPosicionesMeta: 'tablaPosicionMeta',
  ultimaActualizacionDoc: 'ultimaActualizacion'
};
