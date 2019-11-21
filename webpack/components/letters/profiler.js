export class Profiler {
  constructor(words = "") {
    this.raw = words
  }

  get data() {
    return this.wordStat()
  }

  wordStat() {
    const cleanString = this.cleanUp()
    let firstLetters = {max: 0}
    const words = cleanString.split(/\s+/g) //.replace(/(?<=\b\w)\w+\b/g, " ").trim().split(/\s+/g) //split(/(?<=\b\w)\w+\s?\b/g)
    words.map((word) => {
      let l = word[0]
      if (isNaN(Number.parseInt(l)) != true) {
        // if number
        l = "#"
      }
      const n = typeof firstLetters[l] == "undefined" ? 0 : firstLetters[l]
      firstLetters[l] = n + 1
      firstLetters["max"] = firstLetters[l] > firstLetters["max"] ? firstLetters[l] : firstLetters["max"]
    })

    let allLetters = {max: 0}
    const letters = cleanString.replace(/\s+/g, "").split("")
    letters.map((letter) => {
      if (letter.search(/[\d\W_]/) != -1) {
        // if number
        letter = "#"
      }
      const n = typeof allLetters[letter] == "undefined" ? 0 : allLetters[letter]
      allLetters[letter] = n + 1
      allLetters["max"] = allLetters[letter] > allLetters["max"] ? allLetters[letter] : allLetters["max"]
    })
    const data = {
      firstLetters: firstLetters,
      allLetters: allLetters
    }
    return data
  }

  cleanUp() {
    // remove spaces, r/, trailing /, special characters
    const cleanString = this.raw.trim().replace(/\br\//g, "").replace(/[\.,;:\W]+/g, " ").toUpperCase()
    return cleanString
  }

}
