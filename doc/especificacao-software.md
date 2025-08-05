# Especificação de Software — Acqua Calculator

## 1. Visão Geral
O **Acqua Calculator** é um aplicativo web para cálculo de Pace e VO₂ Máximo, voltado para atletas, treinadores e profissionais de Educação Física. O sistema é construído com Next.js, segue Clean Architecture, DDD, TDD e princípios SOLID, e possui interface simples, responsiva e didática.

## 2. Objetivos
- Calcular o Pace (min/km) a partir do tempo e distância.
- Calcular o VO₂ Máximo (ml/kg/min) a partir da distância do teste de Cooper.
- Fornecer explicações claras sobre os cálculos e campos do formulário.
- Garantir código limpo, testável e de fácil manutenção.

## 3. Requisitos Funcionais
- RF01: O usuário deve poder acessar a home e escolher entre as calculadoras de Pace e VO₂ Máximo.
- RF02: O usuário deve preencher tempo (min) e distância (km) para calcular o Pace.
- RF03: O usuário deve preencher a distância (m) do teste de Cooper para calcular o VO₂ Máximo.
- RF04: O sistema deve exibir o resultado formatado e uma explicação da fórmula utilizada.
- RF05: O sistema deve validar os campos e exibir mensagens de erro amigáveis.
- RF06: O sistema deve ser responsivo e acessível.
- RF07: O sistema deve exibir labels e instruções em português.

## 4. Requisitos Não-Funcionais
- RNF01: O sistema deve ser implementado em Next.js (React + TypeScript).
- RNF02: O código deve seguir Clean Architecture, DDD, TDD e SOLID.
- RNF03: O deploy deve ser realizado na Vercel.
- RNF04: O código deve ser público no GitHub.
- RNF05: O sistema deve possuir testes automatizados (unitários e de interface).

## 5. Arquitetura
- **Frontend:** Next.js (App Router), React, TailwindCSS.
- **Backend:** API Routes do Next.js (em `src/app/api/`).
- **Domínio:** Entidades, Value Objects e Use Cases para Pace e VO₂.
- **Aplicação:** Controllers e Presenters para orquestração e formatação.
- **Infraestrutura:** Handlers de API e integração.
- **Testes:** Jest + Testing Library.

## 6. Casos de Uso
### UC01 — Calcular Pace
- Ator: Usuário
- Fluxo:
  1. Usuário acessa a tela de Pace.
  2. Preenche tempo (min) e distância (km).
  3. Clica em "Calcular Pace".
  4. O sistema valida, calcula e exibe o resultado em min/km.
  5. Mensagens de erro são exibidas em caso de dados inválidos.

### UC02 — Calcular VO₂ Máximo (Cooper)
- Ator: Usuário
- Fluxo:
  1. Usuário acessa a tela de VO₂.
  2. Preenche a distância (m) do teste de Cooper.
  3. Clica em "Calcular VO₂ Máximo".
  4. O sistema valida, calcula e exibe o resultado em ml/kg/min.
  5. Mensagens de erro são exibidas em caso de dados inválidos.

## 7. Tecnologias Utilizadas
- Next.js 15 (App Router)
- React 19
- TypeScript
- TailwindCSS
- Jest, Testing Library
- Vercel (deploy)
- GitHub (controle de versão)

## 8. Critérios de Aceitação
- O sistema deve calcular corretamente Pace e VO₂ Máximo.
- Labels, placeholders e instruções devem estar em português e claros.
- O layout deve ser responsivo e acessível.
- O código deve estar versionado no GitHub e com testes passando.
- O deploy deve estar disponível publicamente na Vercel.

## 9. Fórmulas Utilizadas
- **Pace:** `Pace = Tempo (min) ÷ Distância (km)`
- **VO₂ Máximo (Cooper):** `VO₂ Máx = (Distância (m) - 504,9) ÷ 44,73`

---

*Este documento pode ser expandido conforme novas funcionalidades ou requisitos forem definidos.* 
