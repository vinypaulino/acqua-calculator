import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import "@testing-library/jest-dom";

describe("Tela inicial (Home)", () => {
  it("deve exibir a introdução, botões de calculadora de Pace e VO2, e estar em português", () => {
    render(<Home />);
    expect(screen.getByText(/Bem-vindo ao/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Calculadora de Pace/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Calculadora de VO₂ Máximo/i })).toBeInTheDocument();
    expect(screen.getByText(/Desenvolvido para Educação Física/i)).toBeInTheDocument();
  });
}); 
