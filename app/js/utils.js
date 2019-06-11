export function copyState(arr) {
  return [...arr.map(row => [...row])];
}
