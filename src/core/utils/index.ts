function genRandomNumBetween(start: number, end: number) {
  return Math.floor(Math.random() * (end - start + 1)) + start
}

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message)
  }
}

export { genRandomNumBetween, assert }
