import { createAppMetadata } from "@uiux-base/app-kit";
import { workspaceConfig } from "@uiux-base/config";
import { UiFoundationMark } from "@uiux-base/ui";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const appMetadata = createAppMetadata({
  name: "Demo",
  packageName: "demo"
});

function FoundationPage() {
  return (
    <section className="space-y-4">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {appMetadata.packageName}
      </p>
      <h1 className="text-3xl font-semibold text-slate-950">
        Demo da fundacao
      </h1>
      <p className="max-w-2xl text-base leading-7 text-slate-600">
        Espaço executável para validar o template sem introduzir componentes
        completos antes das próximas PRDs.
      </p>
      <UiFoundationMark />
    </section>
  );
}

function PackagesPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold text-slate-950">
        Pacotes do workspace
      </h1>
      <ul className="grid gap-3 sm:grid-cols-3">
        {workspaceConfig.packages.map((packageName) => (
          <li
            className="rounded-md border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800"
            key={packageName}
          >
            {packageName}
          </li>
        ))}
      </ul>
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
              uiux-base demo
            </p>
            <div className="flex flex-col gap-2">
              <Link
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                to="/"
              >
                Fundacao
              </Link>
              <Link
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                to="/packages"
              >
                Pacotes
              </Link>
            </div>
          </nav>
          <main className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <Routes>
              <Route element={<FoundationPage />} path="/" />
              <Route element={<PackagesPage />} path="/packages" />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
