import React from "react";

// import WeightHeightCriteria from "../../pages/Criteria/WeightHeightCriteria/WeightHeightCriteria";
// import WeightHeightChart from "../../pages/Chart/WeightHeightChart";
// import TemperatureCriteria from "../../pages/Criteria/TemperatureCriteria/TemperatureCriteria";
// import TemperatureChart from "../../pages/Chart/TemperatureChart";
// import BloodPressureCriteria from "../../pages/Criteria/BloodPressureCriteria/BloodPressureCriteria";
// import BloodPressureChart from "../../pages/Chart/BloodPressureChart";
// import RateCriteria from "../../pages/Criteria/RateCriteria/RateCriteria";
// import RateChart from "../../pages/Chart/RateChart";
// import OxygenCriteria from "../../pages/Criteria/OxygenCriteria/OxygenCriteria";
// import OxygenChart from "../../pages/Chart/OxygenChart";

const ModalTitle = (props) => {
  return <div className="ModalTitle">{props.children}</div>;
};
const ModalDetail = (props) => {
  return <div className="ModalDetail">{props.children}</div>;
};

export default {
  weightHeight: {
    title: "น้ำหนัก | ส่วนสูง",
    // Criteria: <WeightHeightCriteria />,
    // Chart: <WeightHeightChart />,
    pageIndex: 1,
    data: (() => {
      const weightData = [90.8, 70.0, 72.3, 90.8, 70.0, 72.3, 90.8, 70.0, 72.3];
      const heightData = [182, 180, 179, 182, 180, 179, 182, 180, 179];
      return [
        { type: "weight", data: weightData },
        { type: "height", data: heightData },
        {
          type: "bmi",
          data: weightData.map((weight, index) => {
            const height = heightData[index] / 100;
            const bmi = weight / (height * height);
            return bmi;
          }),
        },
      ];
    })(),
    detail: (
      <div>
        <ModalTitle>น้ำหนัก (Weight)</ModalTitle>
        <ModalDetail>
          น้ำหนักรวมที่ประกอบไปด้วยส่วนต่าง ๆ ได้แก่ ไขมัน กล้ามเนื้ออวัยวะต่าง
          ๆ โครงกระดูก และของเหลวภายในร่างกาย
        </ModalDetail>
        <ModalTitle>ส่วนสูง (Height)</ModalTitle>
        <ModalDetail>
          ความยาวของร่างกายตั้งแต่ส่วนบนสุดของศีรษะลงมาจนถึงฝ่าเท้า
          เป็นเครื่องชี้วัดการเจริญเติบโตและพัฒนาการทางด้านร่างกาย
        </ModalDetail>
        <ModalTitle>ดัชนีมวลกาย (Body Mass Index : BMI)</ModalTitle>
        <ModalDetail>
          ค่าสากลที่ใช้เพื่อคำนวณหาความสัมพันธ์ระหว่างน้ำหนักและส่วนสูง
          นิยมใช้เป็นตัววินิจฉัยว่าใครน้ำหนักตัวเกิน หรือใครเป็นโรคอ้วน
        </ModalDetail>
      </div>
    ),
  },
  temperature: {
    title: "อุณหภูมิร่างกาย",
    // Criteria: <TemperatureCriteria />,
    // Chart: <TemperatureChart />,
    pageIndex: 2,
    data: (() => {
      const temperatureData = [36.7, 36.0, 35.9, 37.0, 38.2, 36];
      return [{ type: "temperature", data: temperatureData }];
    })(),
    detail: (
      <div>
        <ModalTitle>อุณหภูมิร่างกาย (Body Temperature)</ModalTitle>
        <ModalDetail>
          ระดับความสูงต่ำของความร้อนในร่างกาย โดยปกติร่างกายจะมีอุณหภูมิอยู่ที่
          36.5-37.5 °C
        </ModalDetail>
      </div>
    ),
  },
  bloodPressure: {
    title: "ความดันโลหิต",
    // Criteria: <BloodPressureCriteria />,
    // Chart: <BloodPressureChart />,
    pageIndex: 3,
    data: (() => {
      const systolicData = [120, 122, 130, 112, 115, 135, 122];
      const diastolicData = [80, 79, 90, 85, 87, 77, 100];
      return [{ type: "bloodPressure", data: [systolicData, diastolicData] }];
    })(),
    detail: (
      <div>
        <ModalTitle>ความดันโลหิต (ฺBlood Pressure)</ModalTitle>
        <ModalDetail>
          แรงดันของกระแสเลือดที่กระทบต่อผนังหลอดเลือดแดง
          ซึ่งเกิดจากการสูบฉีดของหัวใจ มีค่าที่วัดได้ 2 ค่า ได้แก่
        </ModalDetail>
        <div style={{ margin: "12px 0 0 20px" }}>
          <ModalTitle>> ค่าบน (Systolic)</ModalTitle>
          <ModalDetail>แรงดันเลือดในขณะที่หัวใจบีบตัว</ModalDetail>
          <ModalTitle>> ค่าล่าง (ฺDiastolic)</ModalTitle>
          <ModalDetail>แรงดันเลือดในขณะที่หัวใจคลายตัว</ModalDetail>
        </div>
      </div>
    ),
  },
  rate: {
    title: "ชีพจร",
    // Criteria: <RateCriteria />,
    // Chart: <RateChart />,
    pageIndex: 4,
    data: (() => {
      const rateData = [84, 92, 80, 97, 102, 115];
      return [{ type: "rate", data: rateData }];
    })(),
    detail: (
      <div>
        <ModalTitle>ชีพจร (Pulse)</ModalTitle>
        <ModalDetail>
          อัตราความเร็วของการบีบตัวของหัวใจเพื่อสูบฉีดเลือดไปเลี้ยงยังส่วนต่าง ๆ
          ของร่างกาย มีหน่วยในการวัดเป็นครั้งต่อนาที
          ซึ่งอัตราการเต้นของหัวใจของคนเรานั้นเปลี่ยนแปลงอยู่ตลอดเวลา
          ขึ้นอยู่กับกิจกรรมที่เราทำ
        </ModalDetail>
      </div>
    ),
  },
  oxygen: {
    title: "ออกซิเจนในเลือด",
    // Criteria: <OxygenCriteria />,
    // Chart: <OxygenChart />,
    pageIndex: 5,
    data: (() => {
      const oxygenData = [98, 96, 97, 95, 98, 99];
      return [{ type: "oxygen", data: oxygenData }];
    })(),
    detail: (
      <div>
        <ModalTitle>
          ออกซิเจนในเลือด (Pulse Oxygen Saturation : SPO2)
        </ModalTitle>
        <ModalDetail>
          ค่าความอิ่มตัวของออกซิเจนในเลือด หรือเปอร์เซ็นต์ของ
          <div>ฮีโมโกลบิน</div>ที่จับกับออกซิเจน (Oxyhemoglobin) เทียบกับ
          <div>ฮีโมโกลบิน</div>ที่ไม่จับกับออกซิเจน (Deoxyhemoglobin)
          วัดโดยอาศัยการดูดซับคลื่นแสงที่แตกต่างกันของ<div>ฮีโมโกลบิน</div>
          ที่จับกับออกซิเจน และฮีโมโกลบินที่ไม่จับกับออกซิเจน
        </ModalDetail>
      </div>
    ),
  },
};
