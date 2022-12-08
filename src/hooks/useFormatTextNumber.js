
import React from "react";

const useFormatTextNumber = (e) => {

    const ref = React.useRef(null)

    React.useEffect(()=>{
        ref.current && ref.current.addEventListener("keydown", formatText)
    }, [ref])

    const formatText = (e) => {
        const NUMBER_DOT_COMMA = /^[\d,.]*$/
        const fieldValue = e.target.value
        const fieldHasCommaOrDot = fieldValue.includes('.') || fieldValue.includes(',')
        const keyIsCommaOrDot = e.key === '.' || e.key === ','

        if ((!NUMBER_DOT_COMMA.test(e.key) || (keyIsCommaOrDot && fieldHasCommaOrDot)) && e.code !== "Backspace") {
            e.preventDefault()
            e.target.value = fieldValue.replace(',', '.')
        }
    }

    return [ref]
}

export default useFormatTextNumber