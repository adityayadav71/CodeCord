export default function formatStats(input) {
  if (input) {
    const inputNum = parseFloat(input);
    if (inputNum >= 1000 && inputNum < 1000000) {
      var result = inputNum / 1000;
      var formattedNum =
        inputNum % 1000 === 0 ? Math.trunc(result) : result.toFixed(1);
      return `${formattedNum}K`;
    } else if (inputNum >= 1000000 && inputNum < 1000000000) {
      var result = inputNum / 1000000;
      var formattedNum = inputNum % 1000000 === 0 ? result : result.toFixed(1);
      return `${formattedNum}M`;
    } else if (inputNum >= 1000000000) {
      var result = inputNum / 1000000000;
      var formattedNum =
        inputNum % 1000000000 === 0 ? result : result.toFixed(1);
      return `${formattedNum}B`;
    }
    return inputNum;
  }
}
