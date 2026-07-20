export interface TablaPosicion {
  id: string;
  jugadorId?: number | null;
  jugador: string;
  posicion?: number;
  puntos: number;
  deltaPuntos?: number;
  posicionAnterior?: number;
  cambioPosicion?: number;
  movimientoPosicion?: 'up' | 'down' | 'same';
  pj: number;
  p: number;
  g: number;
  e: number;
  dg: number;
  gc: number;
  gf: number;
}
