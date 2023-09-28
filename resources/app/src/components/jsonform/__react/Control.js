import { RendererComponent } from "./Renderer.jsx"

/**
 * A controlled component convenience wrapper that additionally manages a focused state.
 *
 * @template P control specific properties
 * @template S the state managed by the control
 */
export class Control extends RendererComponent {
    constructor(props) {
        super(props)
        this.state = {
            value: props.data ? props.data : "",
            isFocused: false
        }
    }

    /**
     * Propagates a value change.
     *
     * @param value the updated value
     */
    handleChange = value => {
        this.setState({ value })
        this.updateData(value)
    }

    /**
     * Set the focused state to true.
     */
    onFocus = () => {
        this.setState({ isFocused: true })
    }

    /**
     * Set the focused state to false.
     */
    onBlur = () => {
        this.setState({ isFocused: false })
    }

    updateData = value => {
        this.props.handleChange(this.props.path, value)
    }
}
