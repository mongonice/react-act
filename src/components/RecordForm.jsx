import React, {Component} from 'react';
import {create} from '../api/index.js';

export default class RecordForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            date: '',
            title: '',
            amount: ''
        }
    }

    /**
     * 日期、名称、数量全部为真的时候，按钮才能点击
     */
    valid () {
        return this.state.date && this.state.title && this.state.amount
    }

    /**
     * 处理input输入框内容改变
     * @param {s} event 
     */
    handleChange (event) {
        let name = event.target.name, obj;

         // 高明 使用的逗号运算符， 只有最后一个表达式被返回，其他的都只是被求值
        this.setState((obj = {}, obj['' + name] = event.target.value, obj))
    }

    /**
     * 处理提交form表单操作
     * @param {obj 事件对象} event 
     */
    handleSubmit (event) {
        event.preventDefault();
        const data = {
            date: this.state.date,
            title: this.state.title,
            amount: this.state.amount
        }
        create(data).then(
            response => {
                this.props.handleNewRecord(response.data);
                this.setState({
                    date: '',
                    title: '',
                    amount: ''
                })

                console.log(this.state)
            }
        ).catch(
            error => console.log(error)
        )
    }

    render () {
        return (
            <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" value={this.state.date} onChange={this.handleChange.bind(this)} placeholder="Date" name="date"/>
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" value={this.state.title} onChange={this.handleChange.bind(this)} placeholder="Title" name="title"/>
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" value={this.state.amount} onChange={this.handleChange.bind(this)} placeholder="Amount" name="amount"/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create record</button>
            </form>
        )
    }
}