export const fistLetterCapital = (str) => {
  return str?.replace(/\b\w/g, (match) => match?.toUpperCase())
}
