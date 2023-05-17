exports.generateURL = function () {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = lowerCaseLetters.toUpperCase();
  const numbers = "1234567890";

  let collection = [];
  collection.push(...lowerCaseLetters);
  collection.push(...upperCaseLetters);
  collection.push(...numbers);

  // 組裝
  let output = "http://127.0.0.1:3000/";
  for (let i = 1; i <= 5; i++) {
    output += collection[Math.floor(Math.random() * collection.length)];
  }
  console.log("函式有被執行");
  return output;
};
