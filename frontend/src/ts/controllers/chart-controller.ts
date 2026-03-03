import * as ResultWordHighlight from "../elements/result-word-highlight";

import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  ScatterController,
  TimeScale,
  TimeSeriesScale,
  Tooltip,
  type ChartItem,
  type AnimationSpec,
  type CartesianScaleOptions,
  type ChartConfiguration,
  type ChartDataset,
  type ChartType,
  type DefaultDataPoint,
  type PluginChartOptions,
  type ScaleChartOptions,
  TooltipItem,
} from "chart.js";

import chartAnnotation, {
  type AnnotationOptions,
  type LabelOptions,
} from "chartjs-plugin-annotation";
import chartTrendline from "chartjs-plugin-trendline";
import { get as getTypingSpeedUnit } from "../utils/typing-speed-units";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  ScatterController,
  TimeScale,
  TimeSeriesScale,
  Tooltip,
  chartTrendline,
  chartAnnotation
);

(
  Chart.defaults.animation as AnimationSpec<"line" | "bar" | "scatter">
).duration = 0;
Chart.defaults.elements.line.tension = 0.5;
Chart.defaults.elements.line.fill = "origin";

import * as ThemeColors from "../elements/theme-colors";
import * as ConfigEvent from "../observables/config-event";
import * as TestInput from "../test/test-input";
import * as Arrays from "../utils/arrays";
import * as Numbers from "@rapidkey/util/numbers";
import { blendTwoHexColors } from "../utils/colors";
import { typedKeys } from "../utils/misc";

class ChartWithUpdateColors<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown,
  DatasetIds = never
> extends Chart<TType, TData, TLabel> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    item: ChartItem,
    config: ChartConfiguration<TType, TData, TLabel>
  ) {
    super(item, config);
  }

  async updateColors(): Promise<void> {
    //@ts-expect-error its too difficult to figure out these types, but this works
    await updateColors(this);
  }

  getDataset(id: DatasetIds): ChartDataset<TType, TData> {
    //@ts-expect-error its too difficult to figure out these types, but this works
    return this.data.datasets?.find((x) => x.yAxisID === id);
  }

  getScaleIds(): DatasetIds[] {
    //@ts-expect-error its too difficult to figure out these types, but this works
    return typedKeys(this.options?.scales ?? {}) as DatasetIds[];
  }

  getScale(
    id: DatasetIds extends never ? never : "x" | DatasetIds
  ): DatasetIds extends never ? never : CartesianScaleOptions {
    //@ts-expect-error its too difficult to figure out these types, but this works
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.options.scales[id];
  }
}

let prevTi: TooltipItem<"line" | "scatter"> | undefined;
export const result = new ChartWithUpdateColors<
  "line" | "scatter",
  number[],
  string,
  "wpm" | "raw" | "error" | "burst"
>(document.querySelector("#wpmChart") as HTMLCanvasElement, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        //@ts-expect-error the type is defined incorrectly, have to ingore the error
        clip: false,
        label: "wpm",
        data: [],
        borderColor: "rgba(125, 125, 125, 1)",
        borderWidth: 3,
        yAxisID: "wpm",
        order: 2,
        pointRadius: 1,
      },
      {
        //@ts-expect-error the type is defined incorrectly, have to ingore the error
        clip: false,
        label: "raw",
        data: [],
        borderColor: "rgba(125, 125, 125, 1)",
        borderWidth: 2,
        yAxisID: "raw",
        borderDash: [8, 8],
        order: 3,
        pointRadius: 0,
      },
      {
        //@ts-expect-error the type is defined incorrectly, have to ingore the error
        clip: false,
        label: "errors",
        data: [],
        borderColor: "rgba(255, 125, 125, 1)",
        pointBackgroundColor: "rgba(255, 125, 125, 1)",
        borderWidth: 2,
        order: 1,
        yAxisID: "error",
        type: "scatter",
        pointStyle: "crossRot",
        pointRadius: function (context): number {
          const index = context.dataIndex;
          const value = context.dataset.data[index] as number;
          return (value ?? 0) <= 0 ? 0 : 3;
        },
        pointHoverRadius: function (context): number {
          const index = context.dataIndex;
          const value = context.dataset.data[index] as number;
          return (value ?? 0) <= 0 ? 0 : 5;
        },
      },
      {
        //@ts-expect-error the type is defined incorrectly, have to ingore the error
        clip: false,
        label: "burst",
        data: [],
        borderColor: "rgba(125, 125, 125, 1)",
        borderWidth: 3,
        yAxisID: "burst",
        order: 4,
        pointRadius: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        axis: "x",
        ticks: {
          autoSkip: true,
          autoSkipPadding: 20,
        },
        display: true,
        title: {
          display: false,
          text: "Seconds",
        },
      },
      wpm: {
        axis: "y",
        display: true,
        title: {
          display: true,
          text: "Words per Minute",
        },
        beginAtZero: true,
        min: 0,
        ticks: {
          autoSkip: true,
          autoSkipPadding: 20,
        },
        grid: {
          display: true,
        },
      },
      raw: {
        axis: "y",
        display: false,
        title: {
          display: true,
          text: "Raw Words per Minute",
        },
        beginAtZero: true,
        min: 0,
        ticks: {
          autoSkip: true,
          autoSkipPadding: 20,
        },
        grid: {
          display: false,
        },
      },
      burst: {
        axis: "y",
        display: false,
        title: {
          display: true,
          text: "Burst Words per Minute",
        },
        beginAtZero: true,
        min: 0,
        ticks: {
          autoSkip: true,
          autoSkipPadding: 20,
        },
        grid: {
          display: false,
        },
      },
      error: {
        axis: "y",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Errors",
        },
        beginAtZero: true,
        ticks: {
          precision: 0,
          autoSkip: true,
          autoSkipPadding: 20,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      annotation: {
        annotations: [],
      },
      tooltip: {
        animation: { duration: 250 },
        mode: "index",
        intersect: false,
        callbacks: {
          afterLabel: function (ti): string {
            if (prevTi === ti) return "";
            prevTi = ti;
            try {
              const keypressIndex = Math.round(parseFloat(ti.label)) - 1;
              const wordsToHighlight =
                TestInput.errorHistory[keypressIndex]?.words;

              const unique = [...new Set(wordsToHighlight)];
              const firstHighlightWordIndex = unique[0];
              const lastHighlightWordIndex =
                Arrays.lastElementFromArray(unique);
              if (
                firstHighlightWordIndex === undefined ||
                lastHighlightWordIndex === undefined
              ) {
                return "";
              }
              void ResultWordHighlight.highlightWordsInRange(
                firstHighlightWordIndex,
                lastHighlightWordIndex
              );
            } catch {}
            return "";
          },
        },
      },
    },
  },
});

export type ActivityChartDataPoint = {
  x: number;
  y: number;
  maxWpm?: number;
  restarts?: number;
  amount?: number;
  avgWpm?: number;
  avgAcc?: number;
  avgCon?: number;
};

export const globalSpeedHistogram = new ChartWithUpdateColors<
  "bar",
  ActivityChartDataPoint[],
  string,
  "count"
>(
  document.querySelector(
    ".pageAbout #publicStatsHistogramChart"
  ) as HTMLCanvasElement,
  {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          yAxisID: "count",
          label: "Users",
          data: [],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      hover: {
        mode: "nearest",
        intersect: false,
      },
      scales: {
        x: {
          axis: "x",
          bounds: "ticks",
          display: true,
          title: {
            display: false,
            text: "Bucket",
          },
          offset: true,
        },
        count: {
          axis: "y",
          beginAtZero: true,
          min: 0,
          ticks: {
            autoSkip: true,
            autoSkipPadding: 20,
            stepSize: 10,
          },
          display: true,
          title: {
            display: true,
            text: "Users",
          },
        },
      },
      plugins: {
        annotation: {
          annotations: [],
        },
        tooltip: {
          animation: { duration: 250 },
          intersect: false,
          mode: "index",
        },
      },
    },
  }
);

export const miniResult = new ChartWithUpdateColors<
  "line" | "scatter",
  number[],
  string,
  "wpm" | "burst" | "error"
>(document.querySelector("#miniResultChartModal canvas") as HTMLCanvasElement, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "wpm",
        data: [],
        borderColor: "rgba(125, 125, 125, 1)",
        borderWidth: 3,
        yAxisID: "wpm",
        order: 2,
        pointRadius: 1,
      },
      {
        label: "burst",
        data: [],
        borderColor: "rgba(125, 125, 125, 1)",
        borderWidth: 3,
        yAxisID: "burst",
        order: 3,
        pointRadius: 1,
      },
      {
        label: "errors",
        data: [],
        borderColor: "rgba(255, 125, 125, 1)",
        pointBackgroundColor: "rgba(255, 125, 125, 1)",
        borderWidth: 2,
        order: 1,
        yAxisID: "error",
        type: "scatter",
        pointStyle: "crossRot",
        pointRadius: function (context): number {
          const index = context.dataIndex;
          const value = context.dataset.data[index] as number;
          return (value ?? 0) <= 0 ? 0 : 3;
        },
        pointHoverRadius: function (context): number {
          const index = context.dataIndex;
          const value = context.dataset.data[index] as number;
          return (value ?? 0) <= 0 ? 0 : 5;
        },
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        axis: "x",
        ticks: {
          autoSkip: true,
          autoSkipPadding: 20,
        },
        display: true,
        title: {
          display: false,
          text: "Seconds",
        },
      },
      wpm: {
        axis: "y",
        display: true,
        title: {
          display: true,
          text: "Words per Minute",
        },
        beginAtZero: true,
        min: 0,
        ticks: {
          autoSkip: true,
          autoSkipPadding: 20,
        },
        grid: {
          display: true,
        },
      },
      burst: {
        axis: "y",
        display: false,
        title: {
          display: true,
          text: "Burst Words per Minute",
        },
        beginAtZero: true,
        min: 0,
        ticks: {
          autoSkip: true,
          autoSkipPadding: 20,
        },
        grid: {
          display: false,
        },
      },
      error: {
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Errors",
        },
        beginAtZero: true,
        ticks: {
          precision: 0,
          autoSkip: true,
          autoSkipPadding: 20,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      annotation: {
        annotations: [],
      },
      tooltip: {
        animation: { duration: 250 },
        mode: "index",
        intersect: false,
      },
    },
  },
});

async function updateColors<
  TType extends ChartType = "bar" | "line" | "scatter",
  TData = ActivityChartDataPoint[] | number[],
  TLabel = string
>(chart: ChartWithUpdateColors<TType, TData, TLabel>): Promise<void> {
  const bgcolor = await ThemeColors.get("bg");
  const subcolor = await ThemeColors.get("sub");
  const subaltcolor = await ThemeColors.get("subAlt");
  const maincolor = await ThemeColors.get("main");
  const errorcolor = await ThemeColors.get("error");
  const textcolor = await ThemeColors.get("text");
  const gridcolor = subaltcolor;

  for (const scaleKey of typedKeys(chart.scales)) {
    //@ts-expect-error cant figure out this type but it works fine
    const scale = chart.getScale(scaleKey) as CartesianScaleOptions;
    scale.grid.color = gridcolor;
    scale.grid.tickColor = gridcolor;
    scale.grid.borderColor = gridcolor;
    scale.ticks.color = subcolor;
    scale.title.color = subcolor;
  }

  if (chart.id === result.id) {
    const c = chart as unknown as typeof result;

    const wpm = c.getDataset("wpm");
    wpm.backgroundColor = "transparent";
    wpm.borderColor = maincolor;
    wpm.pointBackgroundColor = maincolor;
    wpm.pointBorderColor = maincolor;

    const raw = c.getDataset("raw");
    raw.backgroundColor = "transparent";
    raw.borderColor = maincolor + "99";
    raw.pointBackgroundColor = maincolor + "99";
    raw.pointBorderColor = maincolor + "99";

    const error = c.getDataset("error");
    error.backgroundColor = errorcolor;
    error.borderColor = errorcolor;
    error.pointBackgroundColor = errorcolor;
    error.pointBorderColor = errorcolor;

    const burst = c.getDataset("burst");
    burst.backgroundColor = blendTwoHexColors(
      subaltcolor,
      subaltcolor + "00",
      0.5
    );
    burst.borderColor = subcolor;
    burst.pointBackgroundColor = subcolor;
    burst.pointBorderColor = subcolor;

    chart.update("resize");
    return;
  }

  if (chart.id === miniResult.id) {
    const c = chart as unknown as typeof miniResult;

    const wpm = c.getDataset("wpm");
    wpm.backgroundColor = "transparent";
    wpm.borderColor = maincolor;
    wpm.pointBackgroundColor = maincolor;
    wpm.pointBorderColor = maincolor;

    const error = c.getDataset("error");
    error.backgroundColor = errorcolor;
    error.borderColor = errorcolor;
    error.pointBackgroundColor = errorcolor;
    error.pointBorderColor = errorcolor;

    const burst = c.getDataset("burst");
    burst.backgroundColor = blendTwoHexColors(
      subaltcolor,
      subaltcolor + "00",
      0.75
    );
    burst.borderColor = subcolor;
    burst.pointBackgroundColor = subcolor;
    burst.pointBorderColor = subcolor;

    chart.update("resize");
    return;
  }

  //@ts-expect-error its too difficult to figure out these types, but this works
  chart.data.datasets[0].borderColor = (ctx): string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const isPb = ctx.raw?.isPb as boolean;
    const color = isPb ? textcolor : maincolor;
    return color;
  };

  if (chart.data.datasets[1]) {
    chart.data.datasets[1].borderColor = subcolor;
  }
  if (chart.data.datasets[2]) {
    chart.data.datasets[2].borderColor = errorcolor;
  }

  const dataset0 = (
    chart.data.datasets as ChartDataset<"line", TData>[]
  )[0] as ChartDataset<"line", TData>;

  if (chart?.data?.datasets[0]?.type === undefined) {
    if (chart.config.type === "line") {
      dataset0.pointBackgroundColor = (ctx): string => {
        //@ts-expect-error not sure why raw comes out to unknown, but this works
        const isPb = ctx.raw?.isPb as boolean;
        const color = isPb ? textcolor : maincolor;
        return color;
      };
    } else if (chart.config.type === "bar") {
      dataset0.backgroundColor = maincolor;
    }
  } else if (chart.data.datasets[0].type === "bar") {
    chart.data.datasets[0].backgroundColor = maincolor;
  } else if (chart.data.datasets[0].type === "line") {
    dataset0.pointBackgroundColor = maincolor;
  }

  const dataset1 = chart.data.datasets[1] as ChartDataset<"line", TData>;

  if (dataset1 !== undefined) {
    if (dataset1.type === undefined) {
      if (chart.config.type === "line") {
        dataset1.pointBackgroundColor = subcolor;
      } else if (chart.config.type === "bar") {
        dataset1.backgroundColor = subcolor;
      }
    } else if ((dataset1?.type as "bar" | "line") === "bar") {
      dataset1.backgroundColor = subcolor;
    } else if (dataset1.type === "line") {
      dataset1.pointBackgroundColor = subcolor;
    }
  }
  if (chart.data.datasets.length === 2) {
    dataset1.borderColor = (): string => {
      const color = subcolor;
      return color;
    };
  }

  const chartScaleOptions = chart.options as ScaleChartOptions<TType>;
  Object.keys(chartScaleOptions.scales).forEach((scaleID) => {
    const axis = chartScaleOptions.scales[scaleID] as CartesianScaleOptions;
    axis.ticks.color = subcolor;
    axis.title.color = subcolor;
    axis.grid.color = gridcolor;
    axis.grid.tickColor = gridcolor;
    axis.grid.borderColor = gridcolor;
  });

  try {
    (
      dataset0.trendlineLinear as TrendlineLinearPlugin.TrendlineLinearOptions
    ).style = subcolor;
  } catch {}

  (
    (chart.options as PluginChartOptions<TType>).plugins.annotation
      .annotations as AnnotationOptions<"line">[]
  ).forEach((annotation) => {
    if (annotation.id !== "funbox-label") {
      annotation.borderColor = subcolor;
    }
    (annotation.label as LabelOptions).backgroundColor = subcolor;
    (annotation.label as LabelOptions).color = bgcolor;
  });

  chart.update("none");
}

function setDefaultFontFamily(font: string): void {
  Chart.defaults.font.family = font.replace(/_/g, " ");
}

export function updateAllChartColors(): void {
  ThemeColors.update();
  void result.updateColors();
  void globalSpeedHistogram.updateColors();
  void miniResult.updateColors();
}

ConfigEvent.subscribe((eventKey, eventValue) => {
if (eventKey === "fontFamily") setDefaultFontFamily(eventValue as string);
});
