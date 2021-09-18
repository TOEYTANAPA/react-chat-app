export const getTimeFormat = (date?: string | undefined | null): string => {
  let d = new Date();
  if (date) d = new Date(date);
  return `${d.getHours()}:${d.getMinutes()}`;
};
