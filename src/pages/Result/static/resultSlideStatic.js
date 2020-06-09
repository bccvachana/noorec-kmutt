import React from "react";

import WeightHeightCriteria from "../ResultSlide/Criteria/WeightHeightCriteria/WeightHeightCriteria";
import TemperatureCriteria from "../ResultSlide/Criteria/TemperatureCriteria/TemperatureCriteria";
import BloodPressureCriteria from "../ResultSlide/Criteria/BloodPressureCriteria/BloodPressureCriteria";
import RateCriteria from "../ResultSlide/Criteria/RateCriteria/RateCriteria";
import OxygenCriteria from "../ResultSlide/Criteria/OxygenCriteria/OxygenCriteria";

const ModalTitle = (props) => {
  return <div className="ModalTitle">{props.children}</div>;
};
const ModalDetail = (props) => {
  return <div className="ModalDetail">{props.children}</div>;
};

export default {
  weightHeight: {
    title: "น้ำหนัก | ส่วนสูง",
    Criteria: WeightHeightCriteria,
    detail: (
      <React.Fragment>
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
      </React.Fragment>
    ),
  },
  temperature: {
    title: "อุณหภูมิร่างกาย",
    Criteria: TemperatureCriteria,
    detail: (
      <React.Fragment>
        <ModalTitle>อุณหภูมิร่างกาย (Body Temperature)</ModalTitle>
        <ModalDetail>
          ระดับความสูงต่ำของความร้อนในร่างกาย โดยปกติร่างกายจะมีอุณหภูมิอยู่ที่
          36.5 - 37.5 °C
        </ModalDetail>
      </React.Fragment>
    ),
  },
  bloodPressure: {
    title: "ความดันโลหิต",
    Criteria: BloodPressureCriteria,
    detail: (
      <React.Fragment>
        <ModalTitle>ความดันโลหิต (ฺBlood Pressure)</ModalTitle>
        <ModalDetail>
          แรงดันของกระแสเลือดที่กระทบต่อผนังหลอดเลือดแดง
          ซึ่งเกิดจากการสูบฉีดของหัวใจ มีค่าที่วัดได้ 2 ค่า ได้แก่
        </ModalDetail>
        <div style={{ margin: "1rem 0 0 1.5rem" }}>
          <ModalTitle>> ค่าบน (Systolic)</ModalTitle>
          <ModalDetail>แรงดันเลือดในขณะที่หัวใจบีบตัว</ModalDetail>
          <ModalTitle>> ค่าล่าง (ฺDiastolic)</ModalTitle>
          <ModalDetail>แรงดันเลือดในขณะที่หัวใจคลายตัว</ModalDetail>
        </div>
      </React.Fragment>
    ),
  },
  rate: {
    title: "ชีพจร",
    Criteria: RateCriteria,
    detail: (
      <React.Fragment>
        <ModalTitle>ชีพจร (Pulse)</ModalTitle>
        <ModalDetail>
          อัตราความเร็วของการบีบตัวของหัวใจเพื่อสูบฉีดเลือดไปเลี้ยงยังส่วนต่าง ๆ
          ของร่างกาย มีหน่วยในการวัดเป็นครั้งต่อนาที
          ซึ่งอัตราการเต้นของหัวใจของคนเรานั้นเปลี่ยนแปลงอยู่ตลอดเวลา
          ขึ้นอยู่กับกิจกรรมที่เราทำ
        </ModalDetail>
      </React.Fragment>
    ),
  },
  oxygen: {
    title: "ออกซิเจนในเลือด",
    Criteria: OxygenCriteria,
    detail: (
      <React.Fragment>
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
      </React.Fragment>
    ),
  },
};
