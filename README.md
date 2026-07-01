# Finance

Plataforma web de financas pessoais para estudantes do Ensino Medio.

## Fase 0

Entregaveis implementados:

- projeto inicial funcionando;
- arquitetura de pastas definida;
- banco local conectado via `localStorage`;
- servico inicial de autenticacao preparado;
- design system inicial em CSS e tokens JavaScript;
- variaveis de ambiente documentadas em `.env.example`;
- padroes de codigo com EditorConfig, Prettier e ESLint;
- CI e deploy de desenvolvimento configurados para GitHub Actions.

## Estrutura

```text
src/
  auth/       servicos de autenticacao
  config/     ambiente e configuracoes
  core/       inicializacao da aplicacao
  database/   persistencia e schema local
  features/   telas por fase do roadmap
  ui/         design system e componentes compartilhados
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Sem Node instalado, use o servidor PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/dev-server.ps1
```

Validacao:

```bash
npm run validate
```
