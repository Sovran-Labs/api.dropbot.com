import BigNumber from 'bignumber.js';

export function randomBigNumberInRange(lowerBound: string, upperBound: string, decimals: number): string {
  console.log('---');
  console.log(BigNumber.random());
  console.log(BigNumber.random().times(BigNumber(upperBound).minus(lowerBound)));
  console.log(BigNumber.random().times(BigNumber(upperBound).minus(lowerBound)).plus(BigNumber(lowerBound)));
  console.log(BigNumber.random().times(BigNumber(upperBound).minus(lowerBound)).plus(BigNumber(lowerBound)).toString());
  console.log('---');

  return BigNumber.random()
    .times(BigNumber(upperBound).minus(lowerBound))
    .plus(BigNumber(lowerBound))
    .decimalPlaces(decimals)
    .toString();
}
