export const strictNumberHandler = (
    value: string,
    previousValue: string | number
  ): string | number => {
    const matchRegex = /^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/;
    const replaceRegex = /[.,]/g;
    const isIntermediate = value === "" || value === "-";
    return isIntermediate || matchRegex.test(value) ? value.replace(replaceRegex, ".") : previousValue;
  };