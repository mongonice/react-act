1、 react 生成组件有三种写法

1) react.createClass    es5的写法

2) React.component  有状态组件 es6

3) 无状态组件 无需state， 高阶组件 hoc 

	1.如果无状态组件以后要变成有状态组件了，怎么办？ 要使用高阶组件

	const HigherOrderComponent = (WrappedComponent) => {
		
		return class WrapperComponent extends Component {
		
			......
		}
	}
	
	
4) 事件的写法：

```
<button onClick={this.changeCount.bind(this)}></button>
<button onClick={() => {this.changeCount()}}></button>
```

5) state是react提供的对象
	
	this.setState({
		// 重新给变量赋值
	})
	
	
	
	
	
## react-router-dom

1. link 

	就是相当于a链接，给页面生成导航条
	
2. NavLink 

	用来给tab导航添加高亮的样式的
	
3. BrowserRouter 和 HashRouter 的区别就是 HashRouter要带 # 号，不好看，一般后台系统可以不注意形象

4. exact 和 strict 是Route 的属性，用来准确匹配路由的

5. Switch 是用来解决 error page页面在每个页面都显示的bug

6. <Route path="/about" render={(props) => <div>我是通过render被渲染出来的组件</div>} name="about"></Route>
		
	还可以将 Route的一些属性值传入到组建中 通过props
	
	
7. 传递参数

	const Detail = (props) => {
		console.log(props)
		return (
			<div>我是Detail</div>
		)
	}

	<Route path="/detail/:id" component={Detail} />
	
	
8. Redirect 重定向  

	一般通过判断来进行页面重定向
	
9. 动态跳转 路由

	如果组件不是用Route 包裹起来的，那怎么获取到 props呢？
	
	不用担心，引入一个 withRouter将组件包裹起来就可以了
	
	import {withRouter} from 'react-router';
	
	const WithRouterButton = withRouter(Button)
	
	
	
	
	
## react 声明周期

componentWillReceiveProps()
shouldComponentUpdate(nextProps, nextState) // 来解决不必要的渲染的
componentWillUpdate()
render()
componentDidUpdate()


## 环境变量

	通过环境变量来判断 使用接口api的url域名
	
	create-react-app 的api自带环境变量配置
	
	新建一个 .env.development.loc 的文件
	
	npm start 跑的时候会自动读取 .env.development.loc文件
	
	如果新建一个 env.production.loc 的文件
	npm build 跑的时候会自动读取 .env.prod.loc文件
	
	
	
## 纯组件的特征
	
	没有事件，没有生命周期，只用来接收父组件传过来的 props值
	
	```js
	import React from 'react';
	
	const CompA = (props) => {
	
		return (
			<div>
				我是纯组件
				{props.text}
			</div>
		)
	}
	
	export default CompA
	```
	
	
	