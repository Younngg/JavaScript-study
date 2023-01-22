// 긴 문자열에서 짧은 문자열이 등장하는 횟수를 세야 하는 경우
// 긴 문자열에서 반복하는 루프를 만드는데, 그 루프 안에 짧은 문자열을 반복하는 중첩 루프를 만든다.

function navieSearch(long, short) {
  let count = 0;

  for (let i = 0; i < long.length; i++) {
    for (let j = 0; j < short.length; j++) {
      if (short[j] !== long[i + j]) break;
      if (j === short.length - 1) count++;
    }
  }
  return count;
}

console.log(navieSearch('lorie loled', 'lol'));
