export const filterArticle = (articles, userData, limit = false) => {
  const { bmiCriteria, bloodPressureCriteria } = userData;
  const filter = Object.keys(articles).filter((articleId) => {
    const { typeBmi, typeBloodPressure } = articles[articleId];
    return (
      typeBmi.includes(bmiCriteria) ||
      typeBloodPressure.includes(bloodPressureCriteria) ||
      typeBmi.length === 5 ||
      typeBloodPressure.length === 4
    );
  });
  return limit ? filter.slice(0, limit) : filter;
};
