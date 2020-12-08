/**
 * 插件： 往Vue上添加全局的属性和方法
 * 语法：
 *    Vue.use(插件名,[参数])
 * 
 * 定义插件:
*    let plugin = {
*       install: (Vue,[参数]) => {
*          
*       }
*    }
 *    
 * 
 */

 //例子：添加全局的一个弹窗事件

const $alert = {
  install: (Vue, Option) =>{
    Vue.prototype.$alert = () => { alert(Option.msg) }
  }
}

export {
  $alert
}

