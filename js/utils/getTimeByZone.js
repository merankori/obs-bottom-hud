export const getTimeByZone = (timeZone) => {
  const getZero = (num) => {
    return num >= 10 ? num : `0${num}`;
  };

  const time = new Date().toLocaleString("en-US", {
    timeZone,
  });

  return `${getZero(new Date(time).getHours())}:${getZero(
    new Date(time).getMinutes()
  )}`;
};
