/**
 * This is the entry point to the program.
 *
 * @param {number} noOfWashes The number of times the laundry machine can clean a dirty sock
 * @param {number[]} cleanPile The array of clean socks
 * @param {number[]} dirtyPile The array of dirty socks to wash
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  // Your solution should go here.
  const totalCleanPile = JSON.parse(JSON.stringify(cleanPile));

  const pairDirtyPile = getDuplicates(dirtyPile);

  console.log('dirtyPile:', dirtyPile)
  console.log('pairDirtyPile:', pairDirtyPile)

  for (let i = 0; i < noOfWashes; i++) {
    dirtyPile.some(elem => {
      if (totalCleanPile.includes(elem) && isPair(totalCleanPile, elem)) {
        totalCleanPile.push(elem);
        dirtyPile.splice(dirtyPile.indexOf(elem), 1);
      } else if (pairDirtyPile.length > 0) {
        const deleted = pairDirtyPile.shift()
        totalCleanPile.push(deleted);
        dirtyPile.splice(dirtyPile.indexOf(deleted), 1);
      } 
      else {
        totalCleanPile.push(elem);
        dirtyPile.splice(dirtyPile.indexOf(elem), 1);
      }
      return true;
    });
  }

  const maxPair = getDuplicates(totalCleanPile);

  return maxPair.length;
}

// Helper function for finding duplicates
function getDuplicates(arr) {
  const arrCopy = JSON.parse(JSON.stringify(arr));
  const duplicates = [];

  arrCopy.sort((a, b) => a - b);

  for (let i = 0; i < arrCopy.length; i++) {
    if (arrCopy[i + 1] === arrCopy[i]) {
      duplicates.push(arrCopy.splice(i, 1));
    }
  }
  return duplicates.flat();
}

// Checking for a pair
function isPair(arr, key) {
  let inc = 0;
  arr.map(val => {
    if (val === key) inc += 1
  }, 0)

  return inc%2 !== 0;
}

module.exports = getMaxPairs;
