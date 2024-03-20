import Decimal from 'decimal.js';
import seedrandom from 'seedrandom';

export async function randomizeTokenAAmount(seed: string, tokenAAmount: string, decimal: number) {
  const rng = seedrandom(seed);
  const randomMultiplier = Math.abs(rng.int32());
  const randomMultiplierToDecimal = new Decimal(`0.0${randomMultiplier}`);
  // const firstChar = randomMultiplier.toString().charAt(0);
  const firstChar = parseInt(randomMultiplier.toString()[0]);

  let randomMultiplierDecimal;

  if (firstChar < 5) {
    // Subtract the randomMultiplier
    randomMultiplierDecimal = new Decimal('1').sub(randomMultiplierToDecimal).toString();
  } else {
    // Add the randomMultiplier
    randomMultiplierDecimal = new Decimal('1').add(randomMultiplierToDecimal).toString();
  }

  const finalTokenAmount = new Decimal(tokenAAmount).mul(randomMultiplierDecimal).toFixed(decimal).toString();
  console.log(`${tokenAAmount} x ${randomMultiplierDecimal} = ${finalTokenAmount}`);
  return finalTokenAmount;
}
