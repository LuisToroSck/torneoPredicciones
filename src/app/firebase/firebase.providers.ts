import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

// Punto de entrada para registrar Firebase cuando agreguemos AngularFire o SDKs directos.
export function provideFirebaseServices(): EnvironmentProviders {
  return makeEnvironmentProviders([]);
}
