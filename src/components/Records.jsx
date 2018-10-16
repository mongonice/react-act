import React, {Component} from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import AmountBox from './AmountBox';
// import $ from 'jquery'; 要按需导入 cnpm install jquery --save
// import {getJSON} from 'jquery';  
// import axios from 'axios';
import * as RecordsAPI from '../api/index.js';  // 引入api中所有的接口  * 代表所有 等价于 RecordsAPI


class Records extends Component{
    constructor () {
        super();

        this.state = {
            error: null,
            isLoaded: false,
            records: []
        }
    }

    componentDidMount () {
        // $.getJSON
        // getJSON('https://5bc3f4273e0ce200135332e2.mockapi.io/api/v1/records').then(
        //     response => this.setState({
        //         records: response,
        //         isLoaded: true
        //     }), 
        //     error => this.setState({
        //         isLoaded: true,
        //         error
        //     }))

        //  不用jquery的 getJSON了，使用axios

        // 请求所有的记录
        RecordsAPI.getAll().then(response => this.setState({
            records: response.data,
            isLoaded: true
        })).catch(error => this.setState({
            error,
            isLoaded: true
        }))
    }

    /**
     * 添加一条新的记录
     * @param {obj 新纪录对象} record   
     */
    handleAddNewRecord (record) {
        console.log(record)
        this.setState({
            error: null,
            isLoaded: true,
            records: [ // 高明 使用扩展运算符，添加一条记录
                ...this.state.records,
                record
            ]
        })
    }

    /**
     *  更新一条记录
     * @param {obj 老的记录对象} oldRecord 
     * @param {obj 新的记录对象} record 
     */
    updateRecord (oldRecord, record) {
        let tId = oldRecord.id;

        // 如果遍历到是要修改的那条记录，就让新纪录覆盖旧记录
        const newRecords = this.state.records.map((item, index) => {
            if (tId === item.id) {
                return {// 高明
                    ...item,
                    ...record
                }
            }
            return item
        })

        console.log('new Records' , newRecords)

        this.setState({
            records: newRecords
        })

    }

    /**
     * 删除一条记录
     * @param {string 要删除的id} rId 
     */
    deleteRecord (rId) {
        console.log(rId)
        // 过滤器是用来删除某些项或者筛选某些项
        const newRecords = this.state.records.filter((item, index) => {
            if (item.id === rId) { // 如果恰巧是要删除的那一条，就不用返回这条记录了
                return false 
            } else {
                return true
            }
        })

        this.setState({
            records: newRecords
        })
    }

    /**
     * 计算收入费用
     */
    credits () {
        // 筛选出大于等于 0 的记录
        let credits = this.state.records.filter((record) => {
            return record.amount >= 0
        })

        return credits.reduce((prev, curr) => {
            return prev + Number.parseInt(curr.amount, 0)
        }, 0) // 0 为初始值
    }

    /**
     * 计算支出费用
     */
    debits () {
        // 筛选出小于 0 的记录
        let credits =  this.state.records.filter((record) => {
            return record.amount < 0
        })

        return credits.reduce((prev, curr) => {
            return prev + Number.parseInt(curr.amount, 0)
        }, 0) // 0 为初始值
    }

    /**
     * 计算最终余额
     */
    balance () {
        return this.credits() + this.debits()
    }

    render () {
        const {error, isLoaded, records} = this.state;
        let recordsDom;

        if (error) {
            recordsDom = <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            recordsDom = <div>Loading</div>
        } else {
            recordsDom = (
                <table className="table table-bordered">
                    <thead className="bg-warning">
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records.map((record, index) => {
                                return (
                                    <Record key={index} 
                                        record={record} 
                                        handleUpdateRecord={this.updateRecord.bind(this)} 
                                        handleDeleteRecord={this.deleteRecord.bind(this)}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }

        return (
            <div className="container">
                <h2 className="bg-info">Records</h2>
                <div className="row">
                    <AmountBox text="Credits" type="success" amount={this.credits()}/>
                    <AmountBox text="Dibits" type="danger"  amount={this.debits()}/>
                    <AmountBox text="Balance" type="primary" amount={this.balance()} />
                </div>
                <RecordForm handleNewRecord={this.handleAddNewRecord.bind(this)}/>
                {recordsDom}
            </div>
        )
    }
}

export default Records