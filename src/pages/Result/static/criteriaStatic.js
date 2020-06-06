export default {
  bmi: {
    underWeight: {
      title: "ผอม",
      detail:
        "น้ำหนักน้อยกว่าปกติ ควรกินอาหารให้เพียงพอ เพิ่มอาหารประเภทที่ให้พลังงานมากขึ้น เช่น ไขมัน แป้ง เนื้อสัตว์ และนม ควบคู่กับการออกกำลังกายเพื่อเสริมสร้างกล้ามเนื้อ",
    },
    normal: {
      title: "สมส่วน",
      detail:
        "น้ำหนักปกติ ห่างไกลโรคที่เกิดจากความอ้วน และมีความเสี่ยงต่อการเกิดโรคต่าง ๆ น้อยที่สุด พยายามรักษาค่า BMI ให้อยู่ในระดับนี้นาน ๆ และควรตรวจสุขภาพทุกปี",
    },
    overWeight: {
      title: "ท้วม",
      detail:
        "น้ำหนักเกิน ควรควบคุมอาหาร โดยลดปริมาณอาหารหรือปรับเปลี่ยนอาหารจากที่ให้พลังงานมากเป็นอาหารที่ให้พลังงานน้อย พยายามลดน้ำหนักให้ค่า BMI อยู่ในระดับปกติ",
    },
    obase: {
      title: "อ้วน",
      detail:
        "อ้วนในระดับหนึ่ง มีความเสี่ยงต่อการเกิดโรคที่มากับความอ้วน ทั้งโรคเบาหวานและความดันโลหิตสูง ควรปรับพฤติกรรมการทานอาหาร ออกกำลังกาย และตรวจสุขภาพ",
    },
    extremeObase: {
      title: "อ้วนมาก",
      detail:
        "ค่อนข้างอันตราย เสี่ยงต่อการเกิดโรคร้ายแรงที่แฝงมากับความอ้วน ต้องปรับพฤติกรรมการทานอาหารและเริ่มออกกำลังกาย ควรไปตรวจสุขภาพและปรึกษาแพทย์อย่างสม่ำเสมอ",
    },
  },
  temperature: {
    low: {
      title: "ต่ำกว่าปกติ",
      detail:
        "อุณหภูมิร่างกายต่ำกว่าปกติ อาจมีภาวะตัวเย็น ควรไปพบแพทย์โดยทันที",
    },
    normal: {
      title: "ปกติ",
      detail:
        "อุณหภูมิร่างกายอยู่ในเกณฑ์ปกติ ไม่มีอาการไข้ พยายามรักษาสุขภาพให้แข็งแรงอยู่เสมอ",
    },
    high: {
      title: "สูงกว่าปกติ",
      detail:
        "อุณหภูมิร่างกายสูงกว่าปกติ อาจมีอาการไข้ ควรพักผ่อนให้เพียงพอ กินอาหารที่มีประโยชน์ กินยาลดไข้ ถ้าอาการไม่ดีขึ้นควรปรึกษาแพทย์เพื่อตรวจวินิจฉัยเพิ่มเติม",
    },
  },
  bloodPressure: {
    low: {
      title: "ต่ำ",
      detail:
        "ความดันโลหิตต่ำกว่าปกติ ควรหยุดกิจกรรมทุกอย่างที่กำลังทำอยู่ ให้นั่งพักหรือนอนลง ดื่มน้ำหรือน้ำเกลือแร่ หากอาการไม่ดีขึ้น ควรรีบไปพบแพทย์",
    },
    normal: {
      title: "ปกติ",
      detail:
        "ความดันโลหิตอยู่ในเกณฑ์ปกติ ดูแลรักษาสุขภาพให้แข็งแรง และหมั่นตรวจเช็คความดันโลหิตอย่างสม่ำเสมอ",
    },
    over: {
      title: "สูงเล็กน้อย",
      detail:
        "ความดันโลหิตเริ่มสูง ควรควบคุมอาหาร ออกกำลังกาย และหมั่นตรวจเช็คความดันโลหิตอย่างสม่ำเสมอ",
    },
    high: {
      title: "สูง",
      detail:
        "ความดันโลหิตสูง ควรควบคุมน้ำหนักให้อยู่ในเกณฑ์ที่เหมาะสม งดสูบบุหรี่ ออกกำลังกายสม่ำเสมอ ลดอาหารเค็ม และไปพบแพทย์เพื่อตรวจวินิจฉัยเพิ่มเติม",
    },
  },
  rate: {
    low: {
      title: "ช้ากว่าปกติ",
      detail:
        "ชีพจรเต้นช้ากว่าปกติ หากมีอาการหน้ามืด เป็นลม เวียนศีรษะ อ่อนเพลีย หรือหมดสติร่วมด้วย ควรไปพบแพทย์เพื่อรักษาต่อไป",
    },
    normal: {
      title: "ปกติ",
      detail:
        "ความดันโลหิตอยู่ในเกณฑ์ปกติ ดูแลรักษาสุขภาพให้แข็งแรง และหมั่นตรวจเช็คความดันโลหิตอย่างสม่ำเสมอ",
    },
    high: {
      title: "เร็วกว่าปกติ",
      detail:
        "ชีพจรเต้นเร็วกว่าปกติ คนที่ออกกำลังกายใหม่ ๆ หรือตื่นเต้น โกรธ กลัว ตกใจ อาจทำให้หัวใจเต้นเร็วได้ แต่หากหัวใจเต้นเร็วตลอดเวลาแม้แต่ขณะหลับจะถือว่าผิดปกติ",
    },
  },
  oxygen: {
    low: {
      title: "ต่ำ",
      detail:
        "ค่าความอิ่มตัวของออกซิเจนในเลือดต่ำกว่าปกติ อาจส่งผลให้สมองทำงานและสั่งงานช้าลงหรือเสียชีวิตจากภาวะหัวใจล้มเหลว การเข้าไปอยู่ในสถานที่อับอากาศก็เป็นสาเหตุให้เกิดสภาวะออกซิเจนต่ำได้",
    },
    normal: {
      title: "ปกติ",
      detail:
        "ค่าความอิ่มตัวของออกซิเจนในเลือดอยู่ในเกณฑ์ปกติ เป็นสภาวะที่ดีที่สุดต่อร่างกาย ส่งผลให้สมองทำงานดี มีผิวพรรณดี และร่างกายแข็งแรง",
    },
    high: {
      title: "สูง",
      detail:
        "ค่าความอิ่มตัวของออกซิเจนในเลือดสูงกว่าปกติ เกิดจากการที่ร่างกายได้รับออกซิเจนมากเกินไป อาจเกิดอาการออกซิเจนเป็นพิษ ทำให้ระบบทางเดินหายใจและระบบประสาทตาทำงานผิดปกติได้",
    },
  },
};
