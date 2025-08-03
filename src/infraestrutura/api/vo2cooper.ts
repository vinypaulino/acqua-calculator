import type { NextApiRequest, NextApiResponse } from 'next';
import { VO2Controller } from '../../aplicacao/VO2Controller';
import { VO2Presenter } from '../../aplicacao/VO2Presenter';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  const { distanceMeters } = req.body;
  if (typeof distanceMeters !== 'number' || isNaN(distanceMeters) || distanceMeters <= 0) {
    return res.status(400).json({ error: 'Distância inválida' });
  }
  try {
    const controller = new VO2Controller();
    const vo2 = controller.calcularVO2Cooper(distanceMeters);
    const result = VO2Presenter.present(vo2);
    return res.status(200).json({ vo2: result });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
} 
