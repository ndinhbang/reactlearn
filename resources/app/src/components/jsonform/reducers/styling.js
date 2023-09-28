import remove from "lodash-es/remove"
import join from "lodash-es/join"
import filter from "lodash-es/filter"
import reduce from "lodash-es/reduce"
import { REGISTER_STYLE, REGISTER_STYLES, UNREGISTER_STYLE } from "../actions/index.js"

const removeStyle = (styles, name) => {
    const copy = styles.slice()
    remove(copy, styleDef => styleDef.name === name)

    return copy
}

const registerStyle = (styles, { name, classNames }) => {
    const copy = removeStyle(styles, name)
    copy.push({ name, classNames })

    return copy
}

export const findStyle = styles => (style, ...args) => {
    const foundStyles = filter(styles, s => s.name === style)
    return reduce(
        foundStyles,
        (res, style) => {
            if (typeof style.classNames === "function") {
                return res.concat(style.classNames(args))
            }
            return res.concat(style.classNames)
        },
        []
    )
}

export const findStyleAsClassName = styles => (style, ...args) =>
    join(findStyle(styles)(style, args), " ")

// TODO
export const stylingReducer = (state = [], action) => {
    switch (action.type) {
        case REGISTER_STYLE: {
            return registerStyle(state, {
                name: action.name,
                classNames: action.classNames
            })
        }
        case REGISTER_STYLES: {
            return action.styles.reduce(
                (allStyles, style) => registerStyle(allStyles, style),
                state
            )
        }
        case UNREGISTER_STYLE: {
            return removeStyle(state, action.name)
        }
        default:
            return state
    }
}
