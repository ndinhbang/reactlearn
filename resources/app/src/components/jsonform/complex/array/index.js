import { isObjectArrayWithNesting, rankWith } from "@jsonforms/core"
import ArrayControlRenderer, { ArrayControl } from "./ArrayControlRenderer"
export { ArrayControlRenderer, ArrayControl }

export const arrayControlTester = rankWith(4, isObjectArrayWithNesting)

export default ArrayControlRenderer
