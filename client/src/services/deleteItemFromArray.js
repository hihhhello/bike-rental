export function deleteItemFromArray(array, item) {
  const itemIndex = array.findIndex(({ id }) => id === item);
  return [...array.slice(0, itemIndex), ...array.slice(itemIndex + 1)];
}
