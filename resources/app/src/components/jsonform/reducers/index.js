import { findStyle, findStyleAsClassName, stylingReducer } from "./styling.js"
export { stylingReducer }

export const getStyle = state => (styleName, ...args) =>
    findStyle(state.jsonforms.styles)(styleName, args)
export const getStyleAsClassName = state => (styleName, ...args) =>
    findStyleAsClassName(state.jsonforms.styles)(styleName, args)
