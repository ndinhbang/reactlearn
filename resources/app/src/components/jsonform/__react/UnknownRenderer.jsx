import React, { Component } from "react"

/**
 * A renderer that will be used in case no other renderer is applicable.
 */
export class UnknownRenderer extends Component {
    render() {
        return (
            <div style={{ color: "red" }}>No applicable {this.props.type} found.</div>
        )
    }
}
