import { designTokens } from "../../ui/design-system.js";

const phaseChecks = [
  {
    description: "Pastas de config, core, database, auth, ui e features criadas.",
    title: "Arquitetura definida",
  },
  {
    description: "Repositorio Git detectado e pronto para versionamento.",
    title: "Repositorio Git",
  },
  {
    description: "Workflow de CI preparado para validar HTML, CSS e JavaScript.",
    title: "CI/CD configurado",
  },
  {
    description: "Scripts de desenvolvimento documentados no package.json.",
    title: "Ambiente de desenvolvimento",
  },
  {
    description: "Banco local inicializado com schema versionado para o MVP.",
    title: "Banco conectado",
  },
  {
    description: "Servico de sessao local preparado para a fase de cadastro e login.",
    title: "Autenticacao preparada",
  },
];

function renderCheckItem(check) {
  return `
    <li class="check-item">
      <span class="check-icon" aria-hidden="true">✓</span>
      <span>
        <span class="check-title">${check.title}</span>
        <span class="check-description">${check.description}</span>
      </span>
    </li>
  `;
}

function renderSwatches() {
  return designTokens.colors
    .map(
      (color) => `
        <span
          class="swatch"
          title="${color.name}: ${color.value}"
          style="background: ${color.value}"
        ></span>
      `,
    )
    .join("");
}

export function renderPhaseZero({ authStatus, databaseStatus, environment }) {
  const checks = phaseChecks
    .map((check) => {
      if (check.title === "Banco conectado") {
        return {
          ...check,
          description: `${check.description} Motor: ${databaseStatus.engine}, schema v${databaseStatus.schemaVersion}.`,
        };
      }

      if (check.title === "Autenticacao preparada") {
        return {
          ...check,
          description: `${check.description} Provider: ${authStatus.provider}.`,
        };
      }

      return check;
    })
    .map(renderCheckItem)
    .join("");

  return `
    <div class="phase-layout">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-content">
          <div class="brand-line">
            <img class="brand-mark" src="./assets/finance.png" alt="" />
            <div>
              <p class="eyebrow">Fase 0 concluida</p>
              <strong>${environment.appName}</strong>
            </div>
          </div>

          <div>
            <h1 id="hero-title">Base tecnica pronta para construir o MVP.</h1>
            <p class="lead">
              A plataforma de financas pessoais para estudantes agora tem estrutura,
              padroes de codigo, design system inicial, banco local e autenticacao
              preparada para as proximas fases.
            </p>
          </div>

          <div class="actions" aria-label="Acoes principais">
            <a class="button button-primary" href="./docs/implementation-plan.md">
              Ver plano
            </a>
            <a class="button button-secondary" href="./docs/PRD.md">
              Ver PRD
            </a>
          </div>
        </div>

        <aside class="status-panel" aria-labelledby="status-title">
          <div class="panel-header">
            <div>
              <h2 id="status-title">Checklist de infraestrutura</h2>
              <p>Validacao visual dos entregaveis da fase 0.</p>
            </div>
            <span class="environment-badge">${environment.appEnvironment}</span>
          </div>
          <ul class="checklist">
            ${checks}
          </ul>
        </aside>
      </section>

      <section class="section-band" aria-labelledby="architecture-title">
        <div class="section-inner">
          <div class="section-title">
            <h2 id="architecture-title">Estrutura definida</h2>
            <p>
              Os modulos foram separados para permitir evolucao por fase sem misturar
              regra de negocio, interface, autenticacao e persistencia.
            </p>
          </div>

          <div class="grid">
            <article class="card">
              <h3>Core</h3>
              <p>Inicializacao do app, injecao de dependencias e ponto unico de montagem.</p>
            </article>
            <article class="card">
              <h3>Database</h3>
              <p>Persistencia local versionada, pronta para migrar para uma API real.</p>
            </article>
            <article class="card">
              <h3>Auth</h3>
              <p>Contrato de sessao preparado para cadastro, login e protecao de rotas.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section-band" aria-labelledby="design-title">
        <div class="section-inner">
          <div class="section-title">
            <h2 id="design-title">Design system inicial</h2>
            <p>
              Tokens de cor, espacamento, raio, botoes, cards e estados de checklist
              foram padronizados para guiar as telas do MVP.
            </p>
            <div class="token-list" aria-label="Cores do design system">
              ${renderSwatches()}
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="section-inner">
          <strong>Deploy alvo: ${environment.deployTarget}</strong>
          <p>Banco: ${databaseStatus.storageKey}</p>
        </div>
      </footer>
    </div>
  `;
}
