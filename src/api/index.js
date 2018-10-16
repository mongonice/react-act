import axios from 'axios';
// create-react-app api提供的环境变量名都以 REACT_APP开头的大写字符串
const host= process.env.REACT_APP_HOST || 'https://5bc3f4273e0ce200135332e2.mockapi.io'

/**
 * 获取所有的记录
 */
export const getAll = () =>
    axios.get(`${host}/api/v1/records`)

/**
 * 创建一条新记录
 * @param {obj 新创建的记录} body 
 */
export const create = (body) =>
    axios.post(`${host}/api/v1/records`, body)

/**
 * 更新一条记录
 * @param {string 要更新的那条id} id 
 * @param {obj 新的记录对象} body 
 */
export const update = (id, body) => 
    axios.put(`${host}/api/v1/records/${id}`, body)

/**
 * 删除一条记录
 * @param {string 要删除的那条id} id 
 */
export const remove = (id) => 
    axios.delete(`${host}/api/v1/records/${id}`)

// 完成整个小项目的增删改查功能