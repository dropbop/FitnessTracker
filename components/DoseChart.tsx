'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { CalculatedDoseRow } from '@/lib/types';
import { format, parseISO, isToday } from 'date-fns';

interface DoseChartProps {
  data: CalculatedDoseRow[];
  compoundName: string;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ payload: CalculatedDoseRow }>; label?: string }) {
  if (!active || !payload || !payload.length) return null;

  const row = payload[0].payload;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-lighter)',
        border: '1px solid var(--color-border)',
        borderRadius: '3px',
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        padding: '8px 10px',
      }}
    >
      <div style={{ color: 'var(--color-text-primary)', marginBottom: '4px' }}>
        {format(parseISO(label as string), 'MMM d, yyyy')}
      </div>
      <div style={{ color: 'var(--color-vb-blue-light)' }}>
        Active Dose: {row.activeDose.toFixed(2)}
      </div>
      {row.addedDose > 0 && (
        <div style={{ color: 'var(--color-accent-orange)' }}>
          Added Dose: {row.addedDose.toFixed(2)}
        </div>
      )}
    </div>
  );
}

export default function DoseChart({ data, compoundName }: DoseChartProps) {
  if (data.length === 0) {
    return (
      <div
        style={{
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--size-sm)',
        }}
      >
        No data to display. Add doses to see the chart.
      </div>
    );
  }

  const maxDose = Math.max(...data.map(d => d.activeDose));
  const yAxisMax = maxDose > 0 ? Math.ceil(maxDose * 1.1) : 100;

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
            tickFormatter={(value) => format(parseISO(value), 'M/d')}
            stroke="var(--color-border)"
            tickLine={{ stroke: 'var(--color-border)' }}
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <YAxis
            tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
            stroke="var(--color-border)"
            tickLine={{ stroke: 'var(--color-border)' }}
            domain={[0, yAxisMax]}
            width={45}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="var(--color-border)" />
          <Line
            type="monotone"
            dataKey="activeDose"
            stroke="var(--color-vb-blue)"
            strokeWidth={2}
            dot={(props: { cx?: number; cy?: number; payload?: CalculatedDoseRow }) => {
              const { cx, cy, payload } = props;
              if (cx === undefined || cy === undefined || !payload) return null;
              const isTodayDot = isToday(parseISO(payload.date));
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={isTodayDot ? 5 : 3}
                  fill={isTodayDot ? 'var(--color-accent-orange)' : 'var(--color-vb-blue)'}
                  strokeWidth={0}
                />
              );
            }}
            activeDot={{ fill: 'var(--color-accent-orange)', strokeWidth: 0, r: 5 }}
            name={compoundName}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
