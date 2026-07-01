import { useId, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis
} from "recharts";
import { EmptyState } from "../feedback/EmptyState";
import { ErrorState } from "../feedback/ErrorState";
import { LoadingState } from "../feedback/LoadingState";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/cn";
import { chartTokens } from "../../tokens/chartTokens";
import {
  ChartTooltip,
  type ChartTooltipDataKey,
  type ChartTooltipPayloadItem,
  type ChartValueFormatter
} from "./ChartTooltip";

export type ChartPanelType = "area" | "bar" | "line";

export type ChartSeriesConfig = {
  color?: string;
  key: string;
  label: string;
  unit?: string;
};

export type ChartPanelProps<TData extends Record<string, unknown>> = {
  actions?: ReactNode;
  ariaLabel?: string;
  className?: string;
  data: TData[];
  description?: ReactNode;
  emptyDescription?: string;
  emptyTitle?: string;
  error?: boolean | string;
  errorTitle?: string;
  formatter?: ChartValueFormatter;
  height?: number;
  loading?: boolean;
  series: ChartSeriesConfig[];
  title: string;
  type?: ChartPanelType;
  xAxisKey: string;
};

type RechartsTooltipPayload = {
  color?: string;
  dataKey?: ChartTooltipDataKey;
  name?: string | number;
  payload?: Record<string, unknown>;
  unit?: ReactNode;
  value?: string | number | ReadonlyArray<string | number>;
};

type RechartsTooltipProps = {
  active?: boolean;
  label?: ReactNode;
  payload?: readonly RechartsTooltipPayload[];
};

function getSeriesColor(series: ChartSeriesConfig, index: number) {
  return series.color ?? chartTokens.series[index % chartTokens.series.length];
}

function renderTooltip(
  props: RechartsTooltipProps,
  formatter?: ChartValueFormatter
) {
  const payload = props.payload?.map<ChartTooltipPayloadItem>((item) => ({
    color: item.color,
    dataKey: item.dataKey,
    name: item.name,
    payload: item.payload,
    unit: typeof item.unit === "string" ? item.unit : undefined,
    value: item.value
  }));

  return (
    <ChartTooltip
      active={props.active}
      formatter={formatter}
      label={props.label}
      payload={payload}
    />
  );
}

function summarizePoint<TData extends Record<string, unknown>>(
  item: TData,
  xAxisKey: string,
  series: ChartSeriesConfig[]
) {
  const label = String(item[xAxisKey] ?? "");
  const values = series
    .map((entry) => `${entry.label} ${String(item[entry.key] ?? "")}`)
    .join(", ");

  return `${label}: ${values}`;
}

export function ChartPanel<TData extends Record<string, unknown>>({
  actions,
  ariaLabel,
  className,
  data,
  description,
  emptyDescription = "Ainda nao ha dados suficientes para montar este grafico.",
  emptyTitle = "Nenhum dado para exibir",
  error,
  errorTitle = "Falha ao carregar grafico",
  formatter,
  height = 300,
  loading = false,
  series,
  title,
  type = "line",
  xAxisKey
}: ChartPanelProps<TData>) {
  const chartLabel = ariaLabel ?? title;
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "min-w-0 rounded-lg border border-slate-200 bg-white shadow-sm",
        className
      )}
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h2
            className="text-lg font-semibold text-slate-950"
            id={titleId}
          >
            {title}
          </h2>
          {description ? (
            <p className="text-sm leading-6 text-slate-600">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>

      {loading ? (
        <div className="space-y-3 p-4">
          <LoadingState
            description="Aguarde enquanto os dados visuais sao preparados."
            title="Carregando grafico"
          />
          <Skeleton className="h-56 w-full" />
        </div>
      ) : error ? (
        <div className="p-4">
          <ErrorState
            description={
              typeof error === "string"
                ? error
                : "Nao foi possivel carregar o grafico."
            }
            title={errorTitle}
          />
        </div>
      ) : data.length === 0 ? (
        <div className="p-4">
          <EmptyState description={emptyDescription} title={emptyTitle} />
        </div>
      ) : (
        <div className="space-y-4 p-4">
          <div
            aria-label={chartLabel}
            className="min-w-0"
            role="img"
            style={{ height }}
          >
            <ResponsiveContainer height="100%" width="100%">
              {type === "bar" ? (
                <BarChart data={data}>
                  <CartesianGrid stroke={chartTokens.grid} vertical={false} />
                  <XAxis dataKey={xAxisKey} stroke={chartTokens.axis} />
                  <YAxis stroke={chartTokens.axis} />
                  <RechartsTooltip
                    content={(props) => renderTooltip(props, formatter)}
                  />
                  {series.map((entry, index) => (
                    <Bar
                      dataKey={entry.key}
                      fill={getSeriesColor(entry, index)}
                      isAnimationActive={false}
                      key={entry.key}
                      name={entry.label}
                      unit={entry.unit}
                    />
                  ))}
                </BarChart>
              ) : type === "area" ? (
                <AreaChart data={data}>
                  <CartesianGrid stroke={chartTokens.grid} vertical={false} />
                  <XAxis dataKey={xAxisKey} stroke={chartTokens.axis} />
                  <YAxis stroke={chartTokens.axis} />
                  <RechartsTooltip
                    content={(props) => renderTooltip(props, formatter)}
                  />
                  {series.map((entry, index) => (
                    <Area
                      dataKey={entry.key}
                      fill={getSeriesColor(entry, index)}
                      fillOpacity={0.16}
                      isAnimationActive={false}
                      key={entry.key}
                      name={entry.label}
                      stroke={getSeriesColor(entry, index)}
                      unit={entry.unit}
                    />
                  ))}
                </AreaChart>
              ) : (
                <LineChart data={data}>
                  <CartesianGrid stroke={chartTokens.grid} vertical={false} />
                  <XAxis dataKey={xAxisKey} stroke={chartTokens.axis} />
                  <YAxis stroke={chartTokens.axis} />
                  <RechartsTooltip
                    content={(props) => renderTooltip(props, formatter)}
                  />
                  {series.map((entry, index) => (
                    <Line
                      dataKey={entry.key}
                      dot={{ r: 3 }}
                      isAnimationActive={false}
                      key={entry.key}
                      name={entry.label}
                      stroke={getSeriesColor(entry, index)}
                      strokeWidth={2}
                      type="monotone"
                      unit={entry.unit}
                    />
                  ))}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          <ul
            aria-label="Series do grafico"
            className="flex flex-wrap gap-3 text-sm text-slate-600"
          >
            {series.map((entry, index) => (
              <li className="flex items-center gap-2" key={entry.key}>
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: getSeriesColor(entry, index) }}
                />
                {entry.label}
              </li>
            ))}
          </ul>

          <div className="sr-only">
            {data.map((item, index) => (
              <p key={index}>{summarizePoint(item, xAxisKey, series)}</p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
