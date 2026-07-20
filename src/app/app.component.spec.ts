import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { TablaPosicionesService } from './tabla-posiciones/tabla-posiciones.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: TablaPosicionesService,
          useValue: {
            watchUltimaActualizacion: () => of(new Date('2026-07-20T00:00:00-04:00')),
            watchTablaPosiciones: () =>
              of([
                {
                  id: '1',
                  jugadorId: 2,
                  jugador: 'Luis',
                  posicion: 1,
                  puntos: 12,
                  deltaPuntos: 3,
                  posicionAnterior: 2,
                  cambioPosicion: 1,
                  movimientoPosicion: 'up',
                  pj: 5,
                  p: 5,
                  g: 4,
                  e: 0,
                  gf: 10,
                  gc: 3,
                  dg: 7
                }
              ])
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Torneo Predicciones 2026' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Torneo Predicciones 2026');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Torneo Predicciones 2026');
  });

  it('should render firestore data in the table', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tbody tr td:nth-child(2)')?.textContent).toContain('Luis');
  });
}
