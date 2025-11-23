import TokenFilters from "@/components/tokens/TokenFilters";
import TokenList from "@/components/tokens/TokenList";
import TokenDetailsPanel from "@/components/tokens/TokenDetailsPanel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 py-4">
      <Card>
        <CardHeader className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base">Token Overview</CardTitle>
            <CardDescription>
              Filter by segment, then search / sort to explore tokens.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <TokenFilters />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <TokenList />
        </div>
        <TokenDetailsPanel />
      </div>
    </div>
  );
}


