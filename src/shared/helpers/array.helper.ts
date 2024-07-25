const sliceAndMerge = <T>(arr: T[], childLength: number): T[][] => {
    const result: T[][] = [];
    let i = 0;
    while (i < arr.length) {
        const children: T[] = [];
        for (let j = i; j < i + childLength && j < arr.length; j++) {
            children.push(arr[j]);
        }

        i += childLength;
        result.push(children);
    }
    return result;
};

export const ArrayHelper = { sliceAndMerge };
