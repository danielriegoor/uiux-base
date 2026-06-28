import { createAppMetadata } from "@uiux-base/app-kit";
import { workspaceConfig } from "@uiux-base/config";
import { UiFoundationMark } from "@uiux-base/ui";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const appMetadata = createAppMetadata({
  name: "Starter",
  packageName: "starter"
});

function OverviewPage() {
  return (
    <section className="space-y-4">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {appMetadata.packageName}
      </p>
      <h1 className="text-3xl font-semibold text-slate-950">
        Starter operacional
      </h1>
      <p className="max-w-2xl text-base leading-7 text-slate-600">
        Base mínima para iniciar uma experiência de aplicação React/Vite com
        rotas, workspace packages e validação automatizada.
      </p>
      <UiFoundationMark />
    </section>
  );
}

function StatusPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold text-slate-950">
        Status da fundacao
      </h1>
      <dl className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-white p-4">
          <dt className="text-sm text-slate-500">Estado</dt>
          <dd className="text-lg font-semibold text-emerald-700">
            {appMetadata.status}
          </dd>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-4">
          <dt className="text-sm text-slate-500">Scripts raiz</dt>
          <dd className="text-lg font-semibold text-slate-950">
            {workspaceConfig.requiredRootScripts.length}
          </dd>
        </div>
      </dl>
    </section>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto grid min-h-screen w-full max-w-6xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
          <nav
            aria-label="Navegacao principal"
            className="rounded-md border border-slate-200 bg-white p-4"
          >
            <p className="mb-4 text-sm font-semibold text-slate-950">
              uiux-base
            </p>
            <div className="flex flex-col gap-2">
              <Link
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                to="/"
              >
                Visao geral
              </Link>
              <Link
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                to="/status"
              >
                Status
              </Link>
            </div>
          </nav>
          <main className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <Routes>
              <Route element={<OverviewPage />} path="/" />
              <Route element={<StatusPage />} path="/status" />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
