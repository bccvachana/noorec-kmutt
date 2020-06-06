const filterStatic = {
  weightHeight: {
    filter: "weight",
    props: ["weight", "height", "bmi", "bmiCriteria"],
  },
  temperature: {
    filter: "temperature",
    props: ["temperature", "temperatureCriteria"],
  },
  bloodPressure: {
    filter: "bloodPressureHigh",
    props: ["bloodPressureHigh", "bloodPressureLow", "bloodPressureCriteria"],
  },
  rateOxygen: {
    filter: "rate",
    props: ["rate", "rateCriteria", "oxygen", "oxygenCriteria"],
  },
};

export const getRecentRecordOne = (record, type) => {
  const { filter, props } = filterStatic[type];
  let temp = record.filter((rec) => {
    return rec[filter];
  });
  let result;
  if (temp.length !== 0) {
    let recent = temp[temp.length - 1];
    result = { createdAt: recent.createdAt };
    props.map((prop) => {
      result = { ...result, [prop]: recent[prop] };
      return null;
    });
  }
  return result;
};

export const getRecentRecordAll = (record) => {
  const type = ["weightHeight", "temperature", "bloodPressure", "rateOxygen"];
  let result;
  type.map((type) => {
    result = { ...result, ...getRecentRecordOne(record, type) };
    return null;
  });

  return Object.keys(result).length !== 0 ? result : null;
};
