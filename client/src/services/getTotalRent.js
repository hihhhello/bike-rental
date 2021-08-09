export default function getTotalRent(rentedBikes = []) {
  return rentedBikes.reduce((accum, { rent_price }) => accum + +rent_price, 0);
}
