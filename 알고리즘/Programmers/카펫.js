function solution(brown, yellow) {
  var answer = [];
  // 갈색 + 노란색 = 가로 * 세로
  // (가로길이 * 2) + (세로길이 * 2) - 4 = 갈색 개수

  let total = brown + yellow;
  let width, height;

  for (let i = 2; i < total / 2; i++) {
    if ((total / i) % 1 !== 0) continue;

    width = total / i;
    height = total / width;

    if (height > width) continue;

    if (width * 2 + height * 2 - 4 === brown) {
      answer = [width, height];
      break;
    }
  }

  return answer;
}
