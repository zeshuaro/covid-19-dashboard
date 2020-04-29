import moment from "moment";

const randomColor = () => {
  return `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255})`;
};

function capitalize(string) {
  const result = string.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

  return finalResult;
}

const formatDate = (string) => moment(string, "DD/MM/YY").format("ll");

export default {
  randomColor,
  capitalize,
  formatDate,
};
