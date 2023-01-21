function validAnagram(str1, str2) {
  const arr1 = str1.split('').sort();
  const arr2 = str2.split('').sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

console.log(validAnagram('aaz', 'zza'));
