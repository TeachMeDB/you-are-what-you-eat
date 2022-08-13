export function count<T>(arr: T[], callback: (e: T) => boolean) {
  var num: number = 0;
  for (var i = 0; i < arr.length; ++i) {
    if (callback(arr[i])) num++;
  }

  return num;
}

export function join(arr: string[], mark: string): string {
  var res = '';
  for (var i = 0; i < arr.length; ++i) {
    res += arr[i];
    res += mark;
  }
  return res;
}

export function arrSum(arr: any[], callback: (e) => number): number {
  var res: number = 0;
  arr.forEach((e) => {
    res += callback(e);
  });
  return res;
}

export function getTitle(fullDesc: string): string {
  if (!fullDesc || fullDesc.length <= 0) return '';
  const ls = fullDesc.split(': ');
  return ls[0];
}

export function getDesc(fullDesc: string): string {
  if (!fullDesc || fullDesc.length <= 0) return '';
  const ls = fullDesc.split(': ');
  var desc: string = '';
  for (var i = 1; i < ls.length; ++i) {
    desc += ls[i];
    if (i < ls.length - 1) desc += ': ';
  }
  return desc;
}
