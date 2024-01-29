// Package
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  // Compare the original string with its reverse
  return cleanedStr === cleanedStr.split('').reverse().join('');
}

// Read user input from the console
rl.question('Enter a string to check for palindrome: ', (userInput) => {
  const result = isPalindrome(userInput);

  if (result) {
    console.log(`The input "${userInput}" is a palindrome.`);
  } else {
    console.log(`The input "${userInput}" is not a palindrome.`);
  }

  rl.close();
});
