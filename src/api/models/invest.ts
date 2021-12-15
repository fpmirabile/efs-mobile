import {
  authenticatedDelete,
  authenticatedGet,
  authenticatedPost,
} from "../calls";

export interface Investment {
  rendimiento: string;
  total: number;
  inversionInicial: number;
  cantidad: number;
  codigo: string;
}

export interface MyInvestment extends Investment {
  clasificacion: number;
  portfolio: number;
  inversiones: Investment[];
}

export interface LineChartData {
  x: number;
  y: number;
  label?: string;
  symbol?: string;
  fill?: string;
  opacity?: number;
}

export interface CandleStickChartData {
  x: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface ChartApi {
  fecha: string;
  ultimaActualizacion: Date;
  codigo: string;
  open: number;
  close: number;
  high: number;
  low: number;
  variacion: string;
  precioId: number;
}

export interface ViewChart extends ChartApi {
  x?: number;
  y?: number;
}

interface InvestmentApplied {
  monedasRestantes: number;
  cantidadComprada: number;
  inversionRealizada: number;
}

interface SellStonk {
  monedasObtenidas: number;
  total: number;
}

export default {
  myInvestments: (): Promise<MyInvestment> => authenticatedGet("/inversiones"),
  getStonk: (stonkAlias: string): Promise<ChartApi[]> =>
    authenticatedGet(`/moneda/precios/${stonkAlias}`),
  invest: (codigo: string, monedas: number): Promise<InvestmentApplied> =>
    authenticatedPost("/inversion", {
      codigo,
      monedas,
    }),
  sell: (stonkCode: string): Promise<SellStonk> =>
    authenticatedDelete(`/inversion/${stonkCode}`),
};
