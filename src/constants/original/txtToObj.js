import text from "./4-words-.txt";

const textToObj = async () => {
  const response = await fetch(text).then((res) => res.text());

  const words = response.toUpperCase().split(/\r\n/);
  // const words = response.toUpperCase().split(/(....)/);

  const wordsSet = new Set(words);

  const wordsNoDuplicate = [...wordsSet];

  const wordFiltered = wordsNoDuplicate.filter((word) => !/[\W]/g.test(word));

  console.log(JSON.stringify(wordFiltered));
};

export default textToObj;
