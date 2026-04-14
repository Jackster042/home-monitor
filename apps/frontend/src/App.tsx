import type { HealthSnapshot } from "@home-monitor/types";

const defaultHealth: HealthSnapshot = {
  service: "platform",
  status: "healthy",
  checkedAt: new Date().toISOString(),
  message: "Repo scaffold complete"
};

export default function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Home Monitoring System</p>
        <h1>Default repo scaffold is ready.</h1>
        <p className="lead">
          Backend, frontend, shared types, and infrastructure folders are in place for the next build step.
        </p>
      </section>

      <section className="panel-grid">
        <article className="panel">
          <h2>Apps</h2>
          <ul>
            <li>Backend API starter</li>
            <li>Frontend Vite app starter</li>
            <li>Shared workspace scripts</li>
          </ul>
        </article>

        <article className="panel">
          <h2>Health</h2>
          <dl>
            <div>
              <dt>Service</dt>
              <dd>{defaultHealth.service}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{defaultHealth.status}</dd>
            </div>
            <div>
              <dt>Checked</dt>
              <dd>{new Date(defaultHealth.checkedAt).toLocaleString()}</dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}
