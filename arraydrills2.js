'use strict';

// A common mistake users make when they type in an
// URL is to put spaces between words or letters. One
// solution that developers can use to solve this problem
// is to replace any spaces with a '%20'. Write a method
// that takes in a string and replaces all its empty spaces
// with a '%20'. Your algorithm can only make 1 pass through
// the string. Examples of input and output for this problem can be

// Input: tauhida parveen
// Output: tauhida%20parveen

// input: www.thinkful.com /tauh ida parv een
// output: www.thinkful.com%20/tauh%20ida%20parv%20een

const urlify = (string) => {
  let fixedString = '';
  string.split('').forEach(char => {
    if (char === ' ') {
      fixedString += '%20';
    } else {
      fixedString += char;
    }
  });
  return fixedString;
};

// Filtering an array
// Imagine you have an array of numbers. Write an algorithm
// to remove all numbers less than five from the array. Don't use
// array's built-in .filter method here; write the
// algorithm from scratch.

const filterArray = (arr) => {
  const newArr = [];
  arr.forEach(num => {
    if (num >= 5) {
      newArr.push(num);
    }
  });
  return newArr;
};

// Max sum in the array
// You are given an array containing positive and negative integers.
// Write an algorithm which will find the largest sum in a
// continuous sequence.

// Input: [-4,6,-3,5,-2,1]
// Output: 12

const maxSum = (arr) => {
  let currentMax = arr[0];
  let currentTotal = 0;

  arr.forEach(num => {
    if (0 < currentTotal + num) {
      currentTotal += num;
    }
    if (currentTotal > currentMax) {
      currentMax = currentTotal;
    }
  });

  return currentMax;
};

// Merge Arrays
// Imagine you have two arrays which have already been
// sorted. Write an algorithm to merge the two arrays
// into a single array, which should also be sorted.

// Input:[1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10]
// Output:[1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]

// VERSION 1
// const arrMerge = (arr1, arr2) => {
//   const mergedArr = [];
//   // const longestArr = arr1.length >= arr2.length ? arr1 : arr2;
//   while (arr1.length > 0 || arr2.length > 0) {
//     if (arr1[0] < arr2[0]) {
//       mergedArr.push(arr1[0]);
//       arr1.shift();
//     }
//     if (arr2[0] < arr1[0]) {
//       mergedArr.push(arr2[0]);
//       arr2.shift();
//     }
//     console.log('merged: ', mergedArr);
//     console.log('arr1: ', arr1);
//     console.log('arr2: ', arr2);
//   }
//   return mergedArr;
// };

// VERSION 2
const arrMerge = (arr1, arr2) => {
  const mergedArr = arr1;
  for (let i=0; i < arr2.length; i++) {
    mergedArr.push(arr2[i]);
  }
  for (let i=0; i < mergedArr.length; i++) {
    for (let j=0; j < i; j++) {
      if (mergedArr[j] > mergedArr[i]) {
        const tempNum = mergedArr[i];
        mergedArr[i] = mergedArr[j];
        mergedArr[j] = tempNum;
      }
    }
  }
  return mergedArr;
};

// Remove Characters
// Write an algorithm that deletes given characters from a
// string. For example, given a string of "Battle of the
// Vowels: Hawaii vs. Grozny" and characters to be removed
// are "aeiou", the algorithm should transform the original
// string to "Bttl f th Vwls: Hw vs. Grzny". Do not use
// Javascript's filter, split, or join methods.

// Input:'Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'
// Output: 'Bttl f th Vwls: Hw vs. Grzny'

const removeChars = (string, chars) => {
  let newString = '';
  for (let i=0; i < string.length; i++) {
    let matched = false;
    for (let j=0; j < chars.length; j++) {
      if (chars[j] === string[i]) {
        matched = true;
      }
    }
    if (!matched) {
      newString += string[i];
    }
    matched = false;
    // if (!chars.includes(string[i])) {
    //   newString += string[i];
    // }
  }
  return newString;
};




function main() {
  // URLIFY
  // Output: tauhida%20parveen
  console.log(urlify('tauhida parveen'));
  // output: www.thinkful.com%20/tauh%20ida%20parv%20een
  console.log(urlify('www.thinkful.com /tauh ida parv een'));

  // FILTER ARRAY
  // output: [5, 7]
  console.log(filterArray([1, 3, 5, 7]));

  // MAX SEQUENCE
  // output: 12
  console.log('max: ', maxSum([4,6,-3,5,-2,1]));
  // output: 12
  console.log('max: ', maxSum([-2,4,6,-3,5,-2,1]));

  // ARRAY MERGE
  // output: [1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]
  console.log('merged: ', arrMerge([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

  // REMOVE CHARACTERS
  // output: 'Bttl f th Vwls: Hw vs. Grzny'
  console.log('removedChars: ', removeChars('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'));
}

main();