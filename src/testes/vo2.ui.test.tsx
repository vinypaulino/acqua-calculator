import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import VO2Page from "../app/vo2/page";

// Mock next/link to avoid errors in test environment
jest.mock("next/link", () => ({ children }: unknown) => children);

describe("Calculadora de VO₂ Máximo (Jack Daniels) UI", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("deve renderizar o formulário de VO2 com campos de distância e tempo", () => {
    render(<VO2Page />);
    expect(screen.getByText(/Calculadora de VO₂ Máximo \(Jack Daniels\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Distância total/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tempo total/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Calcular VO₂ Máximo/i })).toBeInTheDocument();
  });

  it("deve calcular e exibir o VO2 corretamente", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ vo2: "50.2 ml/kg/min" })
    });
    render(<VO2Page />);
    fireEvent.change(screen.getByLabelText(/Distância total/i), { target: { value: "2400" } });
    fireEvent.change(screen.getByLabelText(/Tempo total/i), { target: { value: "12" } });
    fireEvent.click(screen.getByRole("button", { name: /Calcular VO₂ Máximo/i }));
    await waitFor(() => {
      expect(screen.getByText(/Seu VO₂ Máximo:/i)).toHaveTextContent("50.2 ml/kg/min");
    });
  });

  it("deve mostrar erro para valores inválidos", async () => {
    render(<VO2Page />);
    fireEvent.change(screen.getByLabelText(/Distância total/i), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText(/Tempo total/i), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: /Calcular VO₂ Máximo/i }));
    await waitFor(() => {
      expect(screen.getByText(/Por favor, insira valores válidos/i)).toBeInTheDocument();
    });
  });
}); 
