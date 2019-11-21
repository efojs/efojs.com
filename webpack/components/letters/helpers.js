export function isEmpty(obj) {
  for (var x in obj) {return false}
  return true
}

export const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('')
