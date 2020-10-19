export const pluralize = (
  singularForm: string,
  pluralForm: string,
  groupSize: number
) => {
  return groupSize === 1 ? singularForm : pluralForm;
};
