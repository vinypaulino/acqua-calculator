import type { NextApiRequest, NextApiResponse } from 'next';
import { PaceController } from '../../aplicacao/PaceController';
import { PacePresenter } from '../../aplicacao/PacePresenter';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  const { timeMinutes, distanceKm } = req.body;
  if (
    typeof timeMinutes !== 'number' || isNaN(timeMinutes) || timeMinutes <= 0 ||
    typeof distanceKm !== 'number' || isNaN(distanceKm) || distanceKm <= 0
  ) {
    return res.status(400).json({ error: 'Tempo ou distância inválidos' });
  }
  try {
    const controller = new PaceController();
    const pace = controller.calcularPace(timeMinutes, distanceKm);
    const result = PacePresenter.present(pace);
    return res.status(200).json({ pace: result });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
} 
