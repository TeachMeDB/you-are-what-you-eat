export function count<T>(arr: T[], callback: (e: T) => boolean) {
    var num: number = 0;
    for (var i = 0; i < arr.length; ++i) {
        if (callback(arr[i]))
            num++;
    }

    return num;
}