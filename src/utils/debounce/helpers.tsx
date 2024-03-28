// const shallowCheck = (compare: object | Array<any>, compareTo: object | Array<any>) => {
//     if (Array.isArray(compare) && Array.isArray(compareTo)) {
//         return compare.findIndex((_: string, index: number) => compare[index] !== compareTo[index]) === -1 ? false : true
//     }
//     if (typeof compare === 'object' && typeof compareTo === 'object') {
//         Object.keys(compare).findIndex((key: string) => {
//             if (!Object.keys(compareTo).includes(key)) {
//                 return true;
//             }
//             if (compareTo[key]){
//                 return true;
//             }
//             return false;
//         })
//     }

//     return false;
// }