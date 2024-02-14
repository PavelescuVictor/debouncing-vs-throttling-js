export const debounce = (func, debounceTime) => {
    console.log("Outer Closer");
    setTimeout(() => {
        console.log("After Timeout Exec")
        func();
    }, debounceTime)
}

export default {
    debounce,
}