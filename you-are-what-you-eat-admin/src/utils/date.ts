export function getDayTime(begin_date: Date, offset: number, point: 'begin' | 'end' | ''){
    var begin: Date = new Date(begin_date);
    var new_: Date = new Date(( ( begin.getTime()/1000 ) + ( offset * 86400 ) ) * 1000);
    var time_: string = new_.toLocaleDateString().replace(/\//g,"-");
    var arr: string[] = time_.split("-");
  
    arr[1] = Number('0') + Number(arr[1]) < 10 ? '0'+ arr[1] : arr[1];
    arr[2] = Number('0') + Number(arr[2]) < 10 ? '0'+ arr[2] : arr[2];
    return arr.join('-') + (point === 'begin' ? ' 00:00:00' : point === 'end' ? ' 23:59:59' : '');
}

export function toTimeStamp(dateStr: string): number {
    var miliStamp = new Date(dateStr).getTime();
    return Number((miliStamp / 1000).toFixed(0));
}