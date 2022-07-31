export function count<T>(arr: T[], callback: (e: T) => boolean) {
    var num: number = 0;
    for (var i = 0; i < arr.length; ++i) {
        if (callback(arr[i]))
            num++;
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