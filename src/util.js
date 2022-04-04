// utilities

export const sortData = (data) => {
  const sortedData = [...data];

  // data들을 나열하여  a 데이터와 b데이터를 비교한다. (내림차순 정렬 order by cases)
  // return값이 false(-1) 이면 그대로이고 true(1)이면 바꾼다.

  sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  return sortedData;
};
