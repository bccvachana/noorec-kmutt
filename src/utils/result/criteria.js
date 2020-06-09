export const criteriaCheck = {
  weightHeight: ([bmi]) => {
    if (bmi <= 18.5) return "underWeight";
    else if (bmi <= 22.9) return "normal";
    else if (bmi <= 24.9) return "overWeight";
    else if (bmi <= 29.9) return "obase";
    else return "extremeObase";
  },
  temperature: ([temperature]) => {
    if (temperature < 35.8) return "low";
    else if (temperature <= 37.8) return "normal";
    else return "high";
  },
  bloodPressure: ([high, low]) => {
    let highCriteria, lowCriteria;

    if (high <= 90 && low <= 60) return "low";

    if (high <= 129) highCriteria = "normal";
    else if (high <= 139) highCriteria = "over";
    else highCriteria = "high";

    if (low <= 84) lowCriteria = "normal";
    else if (low <= 89) highCriteria = "over";
    else lowCriteria = "high";

    if (highCriteria === "normal" && lowCriteria === "normal") return "normal";
    else if (highCriteria === "over" && lowCriteria === "over") return "over";
    else if (highCriteria === "high" && lowCriteria === "high") return "high";
    else if (highCriteria === "high" || lowCriteria === "high") return "high";
    else if (highCriteria === "over" || lowCriteria === "over") return "over";
  },
  rate: ([rate]) => {
    if (rate < 60) return "low";
    else if (rate > 100) return "high";
    else return "normal";
  },
  oxygen: ([oxygen]) => {
    if (oxygen < 96) return "low";
    else if (oxygen > 99) return "high";
    else return "normal";
  },
};
