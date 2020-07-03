##  vue-router 插件，对vue-router使用中query参数做自动加密、解密

*   使用：

    *   将`utils`文件夹放入项目 **（最好是放在router目录下 ）** 中，在router的初始化文件中，引入`utils/query.js`的`stringifyQuery`和`parseQuery`方法，在`new VueRouter`是时候传递参数，

    *   修改`utils/encryption.js`中的`baseCryptoCode`设置每个项目唯一的值
    
    例：（参考[index.js](https://github.com/wukang0718/vueRouterEncryption/blob/master/index.js)）

    ```
        import Vue from "vue"
        import VueRouter from "vue-router";
        import { stringifyQuery, parseQuery } from "./utils/query";


        Vue.use(VueRouter);

        const routes = [];

        const router = new VueRouter({
            mode: 'history',
            base: process.env.BASE_URL,
            stringifyQuery: stringifyQuery, // 序列化query参数
            parseQuery: parseQuery, // 反序列化query参数
            routes
        });

        export default router

    ```

*   结构：

    *   utils/encryption.js

        文件提供加密和解密算法（默认在index.html中已经引入了crypto-js.js）
        
        *   getEncrypt 加密 对应的解密方法（getDecrypt）
        *   getEncryptToBase64 加密后转base64 对应的解密方法（getDecryptByBase64）
        *   getDecrypt 解密  对应的加密方法（getEncrypt）
        *   getDecryptByBase64 对base64数据解密  先解析base64，在做解密 对应的加密方法（getEncryptToBase64）

    *   utils/query.js

        文件提供了序列化和反序列化的方法

        *   stringifyQuery 序列化对象并 加密
        *   parseQuery  解密 反序列化对象

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