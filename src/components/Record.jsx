import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {update, remove} from '../api/index';

export default class Record extends Component {
    constructor () {
        super();

        this.state = {
            edit: false
        }
    }

    /**
     * 处理编辑状态
     */
    handleToggle () {
        this.setState({
            edit: !this.state.edit
        })
    }

    /**
     * 处理更新某条记录操作
     * @param {obj 事件对象} event 
     */
    handleUpdate (event) {
        event.preventDefault();
        const record = {
            date: this.refs.date.value,
            title: this.refs.title.value,
            amount: this.refs.amount.value
        }

        update(this.props.record.id, record).then(
            response => {
                console.log(response)
                this.props.handleUpdateRecord(this.props.record, record)
                this.setState({
                    edit: false
                })
            }
        ).catch(
            error => console.log(error)
        )

    }

    /**
     * 处理删除一条记录操作
     */
    handleDelete () {
        // 删除一条记录
        remove(this.props.record.id).then(
            response => {
                console.log(response)
                // 子传父 父传给子一个事件，子触发改事件
                this.props.handleDeleteRecord(this.props.record.id)
            }
        ).catch(
            error => console.log(error)
        )
    }

    /**
     * 提炼出记录不可编辑状态dom
     */
    recordNormal () {
        return (
            <tr>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button className="btn btn-info" onClick={this.handleToggle.bind(this)}>Edit</button>
                    <button className="btn btn-danger"  onClick={this.handleDelete.bind(this)}>delete</button>
                </td>
            </tr>
        )
    }

    /**
     * 提炼出记录可编辑状态
     */
    recordEditable () {
        return (
            <tr>
                <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref="date"/></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref="title"/></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.amount} ref="amount"/></td>
                <td>
                    <button className="btn btn-info" onClick={this.handleUpdate.bind(this)}>Update</button>
                    <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>delete</button>
                </td>
            </tr>
        )
    }

    render() {
        if (this.state.edit) {
            return this.recordEditable()
        } else {
            return this.recordNormal()
        }
    }
}

// 传过来的数据类型校验
Record.propTypes = {
    id: PropTypes.string,
    date: PropTypes.string,
    title:  PropTypes.string,
    amount: PropTypes.number
}