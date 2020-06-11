import { articles1 } from "../mockData";

export const filterArticle = (articles, bmi, bloodPressure) => {
  return articles.filter((article) => {
    return (
      article.allBmi ||
      article.allBloodPressure ||
      article[`${bmi}Bmi`] ||
      article[`${bloodPressure}BloodPressure`]
    );
  });
};
