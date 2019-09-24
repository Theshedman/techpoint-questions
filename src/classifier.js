/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */

function classifier(input) {
  // Your code should go here.
  const output = {};

  const inputCopy = JSON.parse(JSON.stringify(input));

  inputCopy.forEach(val => {
    const age = new Date().getFullYear() - val.dob.slice(0, 4);
    val.age = age;
  });
  let inc = 0;

  inputCopy.sort((a, b) => a.age - b.age);

  let j = 0;
  const duplicate = [];
  for (let i = 0; i < inputCopy.length; i += j) {
    let group = {
      members: [],
      oldest: undefined,
      sum: undefined,
      regNos: []
    };

    j = i + 1;

    if (duplicate.includes(inputCopy[i])) continue;

    if (group.members.length === 0) group.members.push(inputCopy[i]);

    while (
      inputCopy[j] !== undefined &&
      inputCopy[j].age - group.members[group.members.length - 1].age <= 5
    ) {
      if (group.members.length <= 3) {
        group.members.unshift(inputCopy[j]);
        group.regNos.unshift(inputCopy[j].regNo);
        group.oldest = group.members.sort((a, b) => b.age - a.age)[0].age;
        group.sum = group.members.reduce((total, { age }) => (total += age), 0);

        duplicate.push(inputCopy[j]);
      }
      j += 1;
    }
    group.regNos.sort((a, b) => a - b);
    group.members.sort((a, b) => a.age - b.age);
    inc += 1;
    output["group" + inc] = group;
  }
  output.noOfGroups = inc;
  return output;
}

module.exports = classifier;
