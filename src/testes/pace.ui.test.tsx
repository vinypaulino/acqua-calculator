import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PacePage from "../app/pace/page";

// Mock next/link to avoid errors in test environment
jest.mock("next/link", () => ({ children }: unknown) => children);

describe("Calculadora de Pace UI", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("deve renderizar o formulário de Pace", () => {
    render(<PacePage />);
    expect(screen.getByText(/Calculadora de Pace/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tempo total/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Distância total/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Calcular Pace/i })).toBeInTheDocument();
  });

  it("deve calcular e exibir o pace corretamente", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ pace: "5:00 min/km" })
    });
    render(<PacePage />);
    fireEvent.change(screen.getByLabelText(/Tempo total/i), { target: { value: "50" } });
    fireEvent.change(screen.getByLabelText(/Distância total/i), { target: { value: "10" } });
    fireEvent.click(screen.getByRole("button", { name: /Calcular Pace/i }));
    await waitFor(() => {
      expect(screen.getByText(/Seu pace:/i)).toHaveTextContent("5:00 min/km");
    });
  });

  it("deve mostrar erro para valores inválidos", async () => {
    render(<PacePage />);
    fireEvent.change(screen.getByLabelText(/Tempo total/i), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText(/Distância total/i), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: /Calcular Pace/i }));
    await waitFor(() => {
      expect(screen.getByText(/Por favor, insira valores válidos/i)).toBeInTheDocument();
    });
  });
}); 
