import {
    BooleanCell,
    booleanCellTester,
    DateCell,
    dateCellTester,
    dateTimeCellTester,
    EnumCell,
    enumCellTester,
    IntegerCell,
    integerCellTester,
    NumberCell,
    numberCellTester,
    SliderCell,
    sliderCellTester,
    TextAreaCell,
    textAreaCellTester,
    TextCell,
    textCellTester,
    TimeCell,
    timeCellTester
} from "./cells"

import {
    InputControl,
    inputControlTester,
    RadioGroupControl,
    radioGroupControlTester,
    OneOfRadioGroupControl,
    oneOfRadioGroupControlTester
} from "./controls"

import {
    ArrayControl,
    arrayControlTester,
    Categorization,
    categorizationTester,
    LabelRenderer,
    labelRendererTester,
    TableArrayControl,
    tableArrayControlTester
} from "./complex"

import {
    GroupLayout,
    groupTester,
    HorizontalLayout,
    horizontalLayoutTester,
    VerticalLayout,
    verticalLayoutTester
} from "./layouts"
import DateTimeCell from "./cells/DateTimeCell"

export * from "./actions"
export * from "./controls"
export * from "./complex"
export * from "./cells"
export * from "./layouts"
export * from "./reducers"
export * from "./util/index.jsx"
export * from "./styles"

export const vanillaRenderers = [
    { tester: inputControlTester, renderer: InputControl },
    { tester: radioGroupControlTester, renderer: RadioGroupControl },
    { tester: oneOfRadioGroupControlTester, renderer: OneOfRadioGroupControl },
    { tester: arrayControlTester, renderer: ArrayControl },
    { tester: labelRendererTester, renderer: LabelRenderer },
    { tester: categorizationTester, renderer: Categorization },
    { tester: tableArrayControlTester, renderer: TableArrayControl },
    { tester: groupTester, renderer: GroupLayout },
    { tester: verticalLayoutTester, renderer: VerticalLayout },
    { tester: horizontalLayoutTester, renderer: HorizontalLayout }
]

export const vanillaCells = [
    { tester: booleanCellTester, cell: BooleanCell },
    { tester: dateCellTester, cell: DateCell },
    { tester: dateTimeCellTester, cell: DateTimeCell },
    { tester: enumCellTester, cell: EnumCell },
    { tester: integerCellTester, cell: IntegerCell },
    { tester: numberCellTester, cell: NumberCell },
    { tester: sliderCellTester, cell: SliderCell },
    { tester: textAreaCellTester, cell: TextAreaCell },
    { tester: textCellTester, cell: TextCell },
    { tester: timeCellTester, cell: TimeCell }
]
