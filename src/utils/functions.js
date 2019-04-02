export function lazyFunction(f) {
  // eslint-disable-next-line func-names
  return function (...args) {
    return f.apply(this, args);
  };
}

export default {
  lazyFunction,
};
