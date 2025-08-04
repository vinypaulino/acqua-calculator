import { NextResponse } from 'next/server';
import { VO2Controller } from '@/aplicacao/VO2Controller';
import { VO2Presenter } from '@/aplicacao/VO2Presenter';

export async function POST(request: Request) {
  const { distanceMeters } = await request.json();
  if (typeof distanceMeters !== 'number' || isNaN(distanceMeters) || distanceMeters <= 0) {
    return NextResponse.json({ error: 'Distância inválida' }, { status: 400 });
  }
  try {
    const controller = new VO2Controller();
    const vo2 = controller.calcularVO2Cooper(distanceMeters);
    const result = VO2Presenter.present(vo2);
    return NextResponse.json({ vo2: result });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 
