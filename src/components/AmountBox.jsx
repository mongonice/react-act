// 纯静态组件，颜色和内容都由 props传递过来
import React from 'react';

const AmountBox = ({text, type, amount}) => {
    return (
        <div className="col-md-4">
            <div className={`panel panel-${type}`}>
                <div className="panel-heading">{text}</div>
                <div className="panel-body">
                    {amount}
                </div>
            </div>
        </div>
    )
}

export default AmountBox