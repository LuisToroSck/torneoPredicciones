import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { firestoreCollections } from '../firebase/firebase.config';
import { getFirestoreDb } from '../firebase/firebase.client';
import { TablaPosicion } from './tabla-posicion.model';

type TablaPosicionData = Partial<Omit<TablaPosicion, 'id'>>;
type UltimaActualizacionData = {
  updatedAt?: { toDate: () => Date } | Date | null;
};

@Injectable({ providedIn: 'root' })
export class TablaPosicionesService {
  watchTablaPosiciones(): Observable<TablaPosicion[]> {
    return new Observable<TablaPosicion[]>((subscriber) => {
      const tablaPosicionesRef = query(
        collection(getFirestoreDb(), firestoreCollections.tablaPosiciones)
      );

      const unsubscribe = onSnapshot(
        tablaPosicionesRef,
        (snapshot) => {
          const posiciones = snapshot.docs
            .map((doc) => this.mapDocumento(doc.id, doc.data() as TablaPosicionData))
            .sort(this.comparePosiciones);

          subscriber.next(posiciones);
        },
        (error) => subscriber.error(error)
      );

      return () => unsubscribe();
    });
  }

  watchUltimaActualizacion(): Observable<Date | null> {
    return new Observable<Date | null>((subscriber) => {
      const ultimaActualizacionRef = doc(
        getFirestoreDb(),
        firestoreCollections.tablaPosicionesMeta,
        firestoreCollections.ultimaActualizacionDoc
      );

      const unsubscribe = onSnapshot(
        ultimaActualizacionRef,
        (snapshot) => {
          if (!snapshot.exists()) {
            subscriber.next(null);
            return;
          }

          const data = snapshot.data() as UltimaActualizacionData;
          subscriber.next(this.mapUltimaActualizacion(data.updatedAt));
        },
        (error) => subscriber.error(error)
      );

      return () => unsubscribe();
    });
  }

  private mapDocumento(id: string, data: TablaPosicionData): TablaPosicion {
    return {
      id,
      jugadorId: typeof data.jugadorId === 'number' ? data.jugadorId : null,
      jugador: data.jugador ?? 'Sin nombre',
      posicion: (typeof data.posicion === 'number' ? data.posicion : Number(id)) || 0,
      puntos: data.puntos ?? 0,
      deltaPuntos: data.deltaPuntos ?? 0,
      posicionAnterior:
        (typeof data.posicionAnterior === 'number'
          ? data.posicionAnterior
          : typeof data.posicion === 'number'
            ? data.posicion
            : Number(id)) || 0,
      cambioPosicion: data.cambioPosicion ?? 0,
      movimientoPosicion: data.movimientoPosicion ?? 'same',
      pj: data.pj ?? 0,
      p: data.p ?? 0,
      g: data.g ?? 0,
      e: data.e ?? 0,
      dg: data.dg ?? 0,
      gc: data.gc ?? 0,
      gf: data.gf ?? 0
    };
  }

  private mapUltimaActualizacion(
    updatedAt: UltimaActualizacionData['updatedAt']
  ): Date | null {
    if (!updatedAt) {
      return null;
    }

    if (updatedAt instanceof Date) {
      return updatedAt;
    }

    if (typeof updatedAt.toDate === 'function') {
      return updatedAt.toDate();
    }

    return null;
  }

  private comparePosiciones(a: TablaPosicion, b: TablaPosicion): number {
    return (
      b.puntos - a.puntos ||
      b.dg - a.dg ||
      b.gf - a.gf ||
      a.jugador.localeCompare(b.jugador)
    );
  }
}
