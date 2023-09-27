const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    if (input.length <= 2 ) {
      console.log("not a valid search")  
    };
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
