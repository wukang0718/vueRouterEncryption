##  vue-router 插件，对vue-router使用中query参数做自动加密、解密

*   原理:

    >   在创建路由的时候，添加两个方法  
    
        
    *   stringifyQuery: 序列化传入的query参数，方法可以接收一个对象参数
        
        在`new Router`的时候传递这个属性，在序列化`query`参数的就执行这个方法，不会执行默认的方法，序列化后在地址栏显示序列化之后的参数

    *   parseQuery:  解析地址栏参数，方法接收一个字符串参数

        在`new Router`的时候传递这个属性，在解析`query`参数的时候，回执行这个方法，不会在执行默认的方法，
        
        **注：** 这个方法只解析`path`中的参数，或者浏览器刷新的时候的地址栏的参数，不会对在`query`参数对处理，如：
        
            ```javascript
                this.$router.push({
                    path: "foo?a=123",
                    query: {
                        b: 345
                    }
                })
            ```
        
        在执行这段代码的时候，`parseQuery`方法不会对`query:{b: 345}`进行解析,会解析`path:"foo?a=123"`中的`a=123`的字符串