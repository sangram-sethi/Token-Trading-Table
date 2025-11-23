import TokenFilters from "@/components/tokens/TokenFilters";
import TokenList from "@/components/tokens/TokenList";

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 py-4">
      <section className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-slate-50">
              Token Overview
            </h1>
            <p className="text-xs text-slate-400">
              Wired up with Redux + Tailwind v4 + Next App Router.
            </p>
          </div>
        </div>
        <TokenFilters />
      </section>

      <TokenList />
    </div>
  );
}
