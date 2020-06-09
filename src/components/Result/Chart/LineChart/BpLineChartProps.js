export const bPLineData = (data, valueIndex) => {
  return {
    labels: data[0].map((value, index) => {
      return index;
    }),

    datasets: [
      {
        label: "Systolic",
        data: data[0],

        backgroundColor: "transparent",

        lineTension: 0,
        borderColor: "#FE9DA0",
        borderWidth: 3.5,
        borderJoinStyle: "rounded",

        pointBackgroundColor: "white",
        pointHoverBackgroundColor: "white",

        pointBorderColor: (point) => {
          return point.dataIndex === valueIndex ? "#feb562" : "#FE9DA0";
        },
        pointHoverBorderColor: "#feb562",

        pointBorderWidth: 3.5,
        pointHoverBorderWidth: 3.5,

        pointRadius: (point) => {
          return point.dataIndex === valueIndex ? 7.5 : 5.5;
        },
        pointHoverRadius: 7.5,
      },
      {
        label: "Diastolic",
        data: data[1],

        backgroundColor: "transparent",

        lineTension: 0,
        borderColor: "#FE9DA0",
        borderWidth: 3.5,
        borderJoinStyle: "rounded",

        pointBackgroundColor: "white",
        pointHoverBackgroundColor: "white",

        pointBorderColor: (point) => {
          return point.dataIndex === valueIndex ? "#feb562" : "#FE9DA0";
        },
        pointHoverBorderColor: "#feb562",

        pointBorderWidth: 3.5,
        pointHoverBorderWidth: 3.5,

        pointRadius: (point) => {
          return point.dataIndex === valueIndex ? 7.5 : 5.5;
        },
        pointHoverRadius: 7.5,
      },
    ],
  };
};

export const bPLineOption = (option) => {
  const { data, valueIndex, fontSize, valuePadding, toFixed } = option;
  return {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        left: 60,
        right: 60,
        top: 10,
        bottom: 0,
      },
    },

    animation: {
      duration: 1500,
    },

    legend: false,
    tooltips: false,

    scales: {
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            suggestedMax: Math.max(...[...data[0], ...data[1]]) + valuePadding,
            suggestedMin: Math.min(...[...data[0], ...data[1]]) - valuePadding,
          },
        },
      ],
      xAxes: [{ display: false }],
    },

    onHover: (event, chartElement) => {
      event.target.style.cursor = chartElement[0] ? "pointer" : "default";
    },

    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
        offset: 3,
        padding: {
          left: 8,
          right: 8,
          top: 5,
          bottom: 3.5,
        },

        display: (point) => {
          return point.dataIndex === valueIndex ? true : false;
        },

        backgroundColor: "rgba(254, 181, 98, 0.85)",
        borderRadius: 30,

        font: {
          size: fontSize,
          weight: 600,
          lineHeight: 1,
        },
        textAlign: "center",
        color: "white",

        formatter: (value, context) => {
          return parseFloat(value).toFixed(toFixed);
        },
      },
    },
  };
};
