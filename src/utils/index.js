
export const transform = (inputText) => {
    const transformText = '';
    const subTexts = inputText.split(/[^A-Z0-9]+|(?<=[A-Z])(?=[0-9])|(?<=[0-9])(?=[A-Z])/);
    for (const subText of subTexts) {
        if (/0+/.test(subText)) {
            numberToChar(subText)
        } else if (/\d/.test(subText)) {
            numberDataToString(subText)
        } else {
            for (const charactor of subText) {
                output += symbolToString(charactor);
            }
        }
    }
    return transformText
}

const symbolToString = (symbolChar) => {
    if (symbolChar === '.') {
        return 'てん'
    } else if (symbolChar === '@') {
        return 'あっとまーく'
    } else if (symbolChar === '#') {
        return 'しゃーぷ'
    } else if (symbolChar === '♯') {
        return 'しゃーぷ'
    } else if (symbolChar === '=') {
        return ''
    } else if (symbolChar === '+') {
        return ''
    } else if (symbolChar === '-') {
        return ''
    } else if (symbolChar === '*') {
        return ''
    } else if (symbolChar === '/') {
        return ''
    } else if (symbolChar === '%') {
        return ''
    } else if (symbolChar === '^') {
        return ''
    } else if (symbolChar === '|') {
        return ''
    } else if (symbolChar === '&') {
        return ''
    } else if (symbolChar === '(') {
        return ''
    } else if (symbolChar === ')') {
        return ''
    } else if (symbolChar === '[') {
        return ''
    } else if (symbolChar === ']') {
        return ''
    } else if (symbolChar === '{') {
        return ''
    } else if (symbolChar === '}') {
        return ''
    } else if (symbolChar === '\\') {
        return ''
    } else if (symbolChar === '$') {
        return ''
    } else if (symbolChar === '"') {
        return ''
    } else if (symbolChar === "'") {
        return ''
    } else if (symbolChar === '`') {
        return ''
    } else {
        return ''
    }
}

const numberToChar = (numberChar) => {
    if (numberChar === '1') {
        return 'いち'
    } else if (numberChar === '2') {
        return 'に'
    } else if (numberChar === '3') {
        return 'さん'
    } else if (numberChar === '4') {
        return 'よん'
    } else if (numberChar === '5') {
        return 'ご'
    } else if (numberChar === '6') {
        return 'ろく'
    } else if (numberChar === '7') {
        return 'なな'
    } else if (numberChar === '8') {
        return 'はち'
    } else if (numberChar === '9') {
        return 'きゅう'
    } else {
        return ''
    }
}

export const numberDataToString = (...numberString) => {
    const [firstChar, secondChar, thirdChar, fourthChar, ...otherChars] = numberString;

    if (!numberString?.length) {
        return ''
    }
    
    if (numberString.length === 1) {
        return numberToChar(firstChar)
    }

    if (numberString.length === 1) {
        return numberToChar(firstChar)
    }

    if (numberString.length === 2) {
        if (numberString[0] === '1') {
            return `じゅう${numberDataToString(otherChars)}`
        }
        return `${numberDataToString(firstChar)}じゅう${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 3) {
        if (numberString[0] === '1') {
            return `ひゃく${numberToChar(otherChars)}`
        }
        return `${numberDataToString(firstChar)}ひゃく${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }


    if (numberString.length === 4) {
        if (numberString[0] === '1') {
            return `せん${numberDataToString(otherChars)}`
        }
        return `${numberDataToString(firstChar)}せん${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 5) {
        return `${numberDataToString(firstChar)}まん${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 6) {
        return `${numberDataToString(firstChar,secondChar)}まん${numberDataToString(thirdChar, fourthChar, otherChars)}`
    }
    
    if (numberString.length === 7) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}まん${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 8) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}まん${numberDataToString(otherChars)}`
    }

    if (numberString.length === 9) {
        return `${numberDataToString(firstChar)}おく${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 10) {
        return `${numberDataToString(firstChar,secondChar)}おく${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 11) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}おく${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 12) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}おく${numberDataToString(otherChars)}`
    }

    if (numberString.length === 13) {
        return `${numberDataToString(firstChar)}ちょう${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 14) {
        return `${numberDataToString(firstChar,secondChar)}ちょう${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 15) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}ちょう${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 16) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}ちょう${numberDataToString(otherChars)}`
    }

    if (numberString.length === 17) {
        return `${numberDataToString(firstChar)}けい${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 18) {
        return `${numberDataToString(firstChar,secondChar)}けい${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 19) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}けい${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 20) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}けい${numberDataToString(otherChars)}`
    }

    if (numberString.length === 21) {
        return `${numberDataToString(firstChar)}がい${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 22) {
        return `${numberDataToString(firstChar,secondChar)}がい${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 23) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}がい${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 24) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}がい${numberDataToString(otherChars)}`
    }

    if (numberString.length === 25) {
        return `${numberDataToString(firstChar)}じょ${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 26) {
        return `${numberDataToString(firstChar,secondChar)}じょ${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 27) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}じょ${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 28) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}じょ${numberDataToString(otherChars)}`
    }

    if (numberString.length === 29) {
        return `${numberDataToString(firstChar)}じょう${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 30) {
        return `${numberDataToString(firstChar,secondChar)}じょう${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 31) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}じょう${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 32) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}じょう${numberDataToString(otherChars)}`
    }

    if (numberString.length === 33) {
        return `${numberDataToString(firstChar)}こう${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 34) {
        return `${numberDataToString(firstChar,secondChar)}こう${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 35) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}こう${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 36) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}こう${numberDataToString(otherChars)}`
    }

    if (numberString.length === 37) {
        return `${numberDataToString(firstChar)}かん${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 38) {
        return `${numberDataToString(firstChar,secondChar)}かん${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 39) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}かん${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 40) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}かん${numberDataToString(otherChars)}`
    }

    if (numberString.length === 41) {
        return `${numberDataToString(firstChar)}せい${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 42) {
        return `${numberDataToString(firstChar,secondChar)}せい${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 43) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}せい${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 44) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}せい${numberDataToString(otherChars)}`
    }

    if (numberString.length === 45) {
        return `${numberDataToString(firstChar)}さい${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 46) {
        return `${numberDataToString(firstChar,secondChar)}さい${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 47) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}さい${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 48) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}さい${numberDataToString(otherChars)}`
    }

    if (numberString.length === 49) {
        return `${numberDataToString(firstChar)}ごく${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 50) {
        return `${numberDataToString(firstChar,secondChar)}ごく${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 51) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}ごく${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 52) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}ごく${numberDataToString(otherChars)}`
    }

    if (numberString.length === 53) {
        return `${numberDataToString(firstChar)}ごうがしゃ${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 54) {
        return `${numberDataToString(firstChar,secondChar)}ごうがしゃ${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 55) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}ごうがしゃ${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 56) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}ごうがしゃ${numberDataToString(otherChars)}`
    }

    if (numberString.length === 57) {
        return `${numberDataToString(firstChar)}あそうぎ${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 58) {
        return `${numberDataToString(firstChar,secondChar)}あそうぎ${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 59) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}あそうぎ${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 60) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}あそうぎ${numberDataToString(otherChars)}`
    }

    if (numberString.length === 61) {
        return `${numberDataToString(firstChar)}なゆた${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 62) {
        return `${numberDataToString(firstChar,secondChar)}なゆた${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 63) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}なゆた${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 64) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}なゆた${numberDataToString(otherChars)}`
    }

    if (numberString.length === 65) {
        return `${numberDataToString(firstChar)}ふかしぎ${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 66) {
        return `${numberDataToString(firstChar,secondChar)}ふかしぎ${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 67) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}ふかしぎ${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 68) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}ふかしぎ${numberDataToString(otherChars)}`
    }

    if (numberString.length === 69) {
        return `${numberDataToString(firstChar)}むりょうたいすう${numberDataToString(secondChar,thirdChar,fourthChar,otherChars)}`
    }
    
    if (numberString.length === 70) {
        return `${numberDataToString(firstChar,secondChar)}むりょうたいすう${numberDataToString(thirdChar,fourthChar,otherChars)}`
    }

    if (numberString.length === 71) {
        return `${numberDataToString(firstChar,secondChar,thirdChar)}むりょうたいすう${numberDataToString(fourthChar,otherChars)}`
    }

    if (numberString.length === 72) {
        return `${numberDataToString(firstChar,secondChar,thirdChar,fourthChar)}むりょうたいすう${numberDataToString(otherChars)}`
    }

    if (numberString.length > 72) {
        let parseString = '';
        for (const char of numberString) {
            parseString+= numberToChar(char)
        }
        return parseString
    }
}