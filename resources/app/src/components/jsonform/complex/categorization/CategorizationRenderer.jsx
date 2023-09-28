import React from "react"
import {
    RendererComponent,
    withJsonFormsLayoutProps,
    withTranslateProps
} from "@jsonforms/react"
import { CategorizationList } from "./CategorizationList"
import { SingleCategory } from "./SingleCategory.jsx"
import { isCategorization } from "./tester"
import { withVanillaControlProps } from "../../util/index.jsx"

class CategorizationRenderer extends RendererComponent {
    onCategorySelected = category => () => {
        return this.setState({ selectedCategory: category })
    }

    /**
     * @inheritDoc
     */
    render() {
        const { uischema, visible, getStyleAsClassName, t } = this.props
        const categorization = uischema
        const classNames = getStyleAsClassName("categorization")
        const masterClassNames = getStyleAsClassName("categorization.master")
        const detailClassNames = getStyleAsClassName("categorization.detail")
        const selectedCategory = this.findCategory(categorization)
        const subcategoriesClassName = getStyleAsClassName("category.subcategories")
        const groupClassName = getStyleAsClassName("category.group")

        return (
            <div
                className={classNames}
                hidden={visible === null || visible === undefined ? false : !visible}
            >
                <div className={masterClassNames}>
                    <CategorizationList
                        categorization={categorization}
                        selectedCategory={selectedCategory}
                        depth={0}
                        onSelect={this.onCategorySelected}
                        subcategoriesClassName={subcategoriesClassName}
                        groupClassName={groupClassName}
                        t={t}
                    />
                </div>
                <div className={detailClassNames}>
                    <SingleCategory
                        category={selectedCategory}
                        schema={this.props.schema}
                        path={this.props.path}
                    />
                </div>
            </div>
        )
    }

    findCategory(categorization) {
        const category = categorization.elements[0]

        if (this.state && this.state.selectedCategory) {
            return this.state.selectedCategory
        }

        if (isCategorization(category)) {
            return this.findCategory(category)
        }

        return category
    }
}

export default withVanillaControlProps(
    withTranslateProps(withJsonFormsLayoutProps(CategorizationRenderer))
)
