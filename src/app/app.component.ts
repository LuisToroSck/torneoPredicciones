import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TablaPosicion } from './tabla-posiciones/tabla-posicion.model';
import { TablaPosicionesService } from './tabla-posiciones/tabla-posiciones.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Torneo Predicciones 2026';
  readonly posiciones = signal<TablaPosicion[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly ultimaActualizacion = signal<Date | null>(null);
  readonly ultimaActualizacionTexto = computed(() => {
    const fecha = this.ultimaActualizacion();

    if (!fecha) {
      return 'Sin actualizaciones registradas';
    }

    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Santiago'
    }).format(fecha);
  });

  private readonly destroyRef = inject(DestroyRef);
  private readonly tablaPosicionesService = inject(TablaPosicionesService);

  constructor() {
    this.tablaPosicionesService
      .watchUltimaActualizacion()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (fecha) => this.ultimaActualizacion.set(fecha),
        error: () => this.ultimaActualizacion.set(null)
      });

    this.tablaPosicionesService
      .watchTablaPosiciones()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (posiciones) => {
          this.posiciones.set(posiciones);
          this.loading.set(false);
          this.errorMessage.set('');
        },
        error: () => {
          this.loading.set(false);
          this.errorMessage.set(
            'No se pudo leer Firestore. Revisa la configuracion de Firebase y el nombre de la coleccion.'
          );
        }
      });
  }

  getDeltaPuntosTexto(posicion: TablaPosicion): string {
    const delta = posicion.deltaPuntos ?? 0;
    return delta > 0 ? `+${delta}` : `${delta}`;
  }

  getDeltaPuntosClase(posicion: TablaPosicion): string {
    const delta = posicion.deltaPuntos ?? 0;

    if (delta > 0) {
      return 'delta-badge delta-badge--up';
    }

    if (delta < 0) {
      return 'delta-badge delta-badge--down';
    }

    return 'delta-badge delta-badge--same';
  }

  getMovimientoTexto(posicion: TablaPosicion): string {
    const cambio = Math.abs(posicion.cambioPosicion ?? 0);

    if (posicion.movimientoPosicion === 'up') {
      return `▲${cambio}`;
    }

    if (posicion.movimientoPosicion === 'down') {
      return `▼${cambio}`;
    }

    return '=';
  }

  getMovimientoClase(posicion: TablaPosicion): string {
    if (posicion.movimientoPosicion === 'up') {
      return 'movement-badge movement-badge--up';
    }

    if (posicion.movimientoPosicion === 'down') {
      return 'movement-badge movement-badge--down';
    }

    return 'movement-badge movement-badge--same';
  }
}
