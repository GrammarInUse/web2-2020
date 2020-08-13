import React, { Component } from 'react';
import RowInSideBar from "./RowInSideBar";

export default class NavMenuUser extends Component {
    render() {
        return (
            <ul id="wrapper">
                <RowInSideBar title="Deposit_in"/>
                <RowInSideBar title="Deposit_out"/>
                <RowInSideBar title="OnlDeposit"/>
                <RowInSideBar title="Profile"/>
                <RowInSideBar title="ChangePass"/>
            </ul>
        )
    }
}
