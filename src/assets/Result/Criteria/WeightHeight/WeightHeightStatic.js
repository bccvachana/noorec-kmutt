import UnderWeight from "./0.svg";
import Normal from "./1.svg";
import OverWeight from "./2.svg";
import Obase from "./3.svg";
import ExtreamObase from "./4.svg";

export default {
  underWeight: {
    title: "ผอม",
    svg: UnderWeight,
    bar: 10,
    ratio: 0.79,
  },
  normal: {
    title: "สมส่วน",
    svg: Normal,
    bar: 30,
    ratio: 0.79,
  },
  overWeight: {
    title: "ท้วม",
    svg: OverWeight,
    bar: 50,
    ratio: 0.87,
  },
  obase: {
    title: "อ้วน",
    svg: Obase,
    bar: 70,
    ratio: 0.96,
  },
  extremeObase: {
    title: "อ้วนมาก",
    svg: ExtreamObase,
    bar: 90,
    ratio: 1,
  },
};
