export const bPBarData = (data, valueIndex) => {
  return {
    labels: data[0].map((value, index) => {
      return index;
    }),

    datasets: [
      {
        label: "Systolic",
        data: data[0],

        backgroundColor: (bar) => {
          return bar.dataIndex === valueIndex ? "#feb562" : "#FE9DA0";
        },
        hoverBackgroundColor: "#feb562",
        categoryPercentage: 0.7,
        barPercentage: 0.7,
      },
      {
        label: "Diastolic",
        data: data[1],
        backgroundColor: (bar) => {
          return bar.dataIndex === valueIndex ? "#feb562" : "#FE9DA0";
        },
        hoverBackgroundColor: "#feb562",
        categoryPercentage: 0.7,
        barPercentage: 0.7,
      },
    ],
  };
};

export const bPBarOption = (option) => {
  const { data, valueIndex, fontSize, valuePadding, toFixed } = option;
  return {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0,
      },
    },

    animation: {
      duration: 1500,
    },

    legend: false,
    tooltips: false,

    cornerRadius: 10,

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
        offset: 2,
        padding: {
          left: 6,
          right: 6,
          top: 5,
          bottom: 3.5,
        },

        display: (bar) => {
          return bar.dataIndex === valueIndex ? true : false;
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
