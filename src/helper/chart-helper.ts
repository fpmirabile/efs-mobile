import { ChartApi, ViewChart } from "../api/models/invest";

export const transformToViewChart = (data: ChartApi[]): ViewChart[] => {
  const result: ViewChart[] = [];

  data.forEach((item) => {
    const x = new Date(item.fecha).getTime();
    const y = item.close;
  
    const currentViewChart = {
      x,
      y,
      ...item,
    }

    result.push(currentViewChart);
  });

  return result;
};
