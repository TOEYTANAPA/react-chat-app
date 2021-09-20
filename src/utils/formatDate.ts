export const getTimeFormat = (date?: string | undefined | null): string => {
  let d = new Date();
  if (date) d = new Date(date);
  return `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
};
