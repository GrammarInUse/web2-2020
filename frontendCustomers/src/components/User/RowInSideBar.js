import React, { Component } from 'react'

export default class RowInSideBar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <li>
                {this.props.title}
            </li>
        )
    }
}
