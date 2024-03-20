export function p(val?: any, ...vals: any[]) {
  if (val) {
    console.log(val, ...vals);
  } else {
    console.log();
  }
}
