export const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: {
      display: true,
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  datasets: {
    doughnut: {
      spacing: 0,
    },
  },
};
