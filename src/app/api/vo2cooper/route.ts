import { NextResponse } from 'next/server';
import { VO2Controller } from '@/aplicacao/VO2Controller';
import { VO2Presenter } from '@/aplicacao/VO2Presenter';

export async function POST(request: Request) {
  const { distanceMeters, timeMinutes } = await request.json();
  if (
    typeof distanceMeters !== 'number' || isNaN(distanceMeters) || distanceMeters <= 0 ||
    typeof timeMinutes !== 'number' || isNaN(timeMinutes) || timeMinutes <= 0
  ) {
    return NextResponse.json({ error: 'Distância ou tempo inválidos' }, { status: 400 });
  }
  try {
    const controller = new VO2Controller();
    const vo2 = controller.calcularVO2JackDaniels(distanceMeters, timeMinutes);
    const result = VO2Presenter.present(vo2);
    return NextResponse.json({ vo2: result });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 
