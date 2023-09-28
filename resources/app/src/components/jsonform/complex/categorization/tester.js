import isEmpty from "lodash/isEmpty"
import { and, rankWith, uiTypeIs } from "@jsonforms/core"

export const isCategorization = category => category.type === "Categorization"

export const categorizationTester = rankWith(
    1,
    and(uiTypeIs("Categorization"), uischema => {
        const hasCategory = element => {
            if (isEmpty(element.elements)) {
                return false
            }

            return element.elements
            .map(elem =>
                isCategorization(elem) ? hasCategory(elem) : elem.type === "Category"
            )
            .reduce((prev, curr) => prev && curr, true)
        }

        return hasCategory(uischema)
    })
)
