import React, { useContext } from "react"
import { vanillaStyles } from "./styles.js"

const defaultContext = {
    styles: vanillaStyles
}

export const JsonFormsStyleContext = React.createContext(defaultContext)

export const useStyleContext = () => useContext(JsonFormsStyleContext)

export const useStyles = () => {
    const { styles } = useStyleContext()
    return styles
}
