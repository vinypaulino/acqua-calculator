import { NextResponse } from 'next/server';
import { PaceController } from '@/aplicacao/PaceController';
import { PacePresenter } from '@/aplicacao/PacePresenter';

export async function POST(request: Request) {
  const { timeMinutes, distanceKm } = await request.json();
  if (
    typeof timeMinutes !== 'number' || isNaN(timeMinutes) || timeMinutes <= 0 ||
    typeof distanceKm !== 'number' || isNaN(distanceKm) || distanceKm <= 0
  ) {
    return NextResponse.json({ error: 'Tempo ou distância inválidos' }, { status: 400 });
  }
  try {
    const controller = new PaceController();
    const pace = controller.calcularPace(timeMinutes, distanceKm);
    const result = PacePresenter.present(pace);
    return NextResponse.json({ pace: result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
} 
