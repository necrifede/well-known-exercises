/**
 * Given 2 array of numbers and a target number,
 * return a pair of numbers from each array who’s sum is closest
 * to the target
 *
 * Example:
 * array 1 = [3, 8, 2, 9, 5]
 * array 2 = [4, 1, 2, 10, 5, 20]
 * target = 24
 *
 * result could be (3, 20)
 * another correct result (5, 20)
 *
 * Find the best optimal solution
 */
const compareFn = (a, b) => a - b;
const compareReverseFn = (a, b) => b - a;

const getCloseSum = (arr1, arr2, target) => {
  const ar1 = [...arr1].sort(compareReverseFn);
  const ar2 = [...arr2].sort(compareFn);
  let bestSum = undefined;
  let bestI = undefined;
  let bestJ = undefined;

  let i = 0;
  let j = 0;
  while (i < ar1.length && j < ar2.length) {
    const sum = ar1[i] + ar2[j];

    if (sum === target) {
      return [ar1[i], ar2[j]];
    }

    if (
      bestSum === undefined ||
      Math.abs(target - sum) < Math.abs(target - bestSum)
    ) {
      bestSum = sum;
      bestI = i;
      bestJ = j;
    }

    if (sum < target) {
      j++;
    } else {
      i++;
    }
  }

  return [ar1[bestI], ar2[bestJ]];
};

export { getCloseSum };
