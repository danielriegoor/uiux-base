import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type ChartTooltipValue = string | number;
export type ChartTooltipDataKey =
  | string
  | number
  | ((item: unknown) => unknown);

export type ChartTooltipPayloadItem = {
  color?: string;
  dataKey?: ChartTooltipDataKey;
  name?: string | number;
  payload?: Record<string, unknown>;
  unit?: string;
  value?: ChartTooltipValue | ReadonlyArray<ChartTooltipValue>;
};

export type ChartValueFormatter = (
  value: ChartTooltipValue,
  unit?: string,
  label?: string
) => ReactNode;

export type ChartTooltipProps = {
  active?: boolean;
  className?: string;
  formatter?: ChartValueFormatter;
  label?: ReactNode;
  payload?: ChartTooltipPayloadItem[];
};

function isValueArray(
  value: ChartTooltipPayloadItem["value"]
): value is ReadonlyArray<ChartTooltipValue> {
  return Array.isArray(value);
}

function formatValue(
  value: ChartTooltipPayloadItem["value"],
  formatter?: ChartValueFormatter,
  unit?: string,
  label?: string
) {
  if (isValueArray(value)) {
    return value.join(" - ");
  }

  if (value === undefined) {
    return "";
  }

  return formatter ? formatter(value, unit, label) : `${unit ? `${unit} ` : ""}${value}`;
}

export function ChartTooltip({
  active,
  className,
  formatter,
  label,
  payload
}: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "min-w-40 rounded-md border border-slate-200 bg-white p-3 text-sm shadow-lg",
        className
      )}
      role="tooltip"
    >
      {label ? <p className="mb-2 font-semibold text-slate-950">{label}</p> : null}
      <dl className="space-y-2">
        {payload.map((item) => {
          const itemLabel = item.name ? String(item.name) : String(item.dataKey);

          return (
            <div className="flex items-center justify-between gap-4" key={itemLabel}>
              <dt className="flex items-center gap-2 text-slate-600">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {itemLabel}
              </dt>
              <dd className="font-semibold tabular-nums text-slate-950">
                {formatValue(item.value, formatter, item.unit, itemLabel)}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
