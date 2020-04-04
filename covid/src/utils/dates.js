export function parseISODateString(isoDateString) {
  const year = isoDateString.slice(0, 4);
  const month = isoDateString.slice(5, 7) - 1;
  const day = isoDateString.slice(8, 10);
  const hour = isoDateString.slice(11, 13);
  const minute = isoDateString.slice(14, 16);
  const second = 0;
  return new Date(year, month, day, hour, minute, second);
}
