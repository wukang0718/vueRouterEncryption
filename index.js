import Vue from "vue"
import VueRouter from "vue-router";
import { stringifyQuery, parseQuery } from "./utils/query";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import(/* webpackChunkName: "home" */"../views/Home")
    },
    {
        path: "/foo",
        name: "foo",
        component: () => import(/* webpackChunkName: "foo" */"../views/Foo")
    },
    {
        path: "/bar",
        name: "bar",
        component: () => import(/* webpackChunkName: "bar" */"../views/Bar")
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    stringifyQuery: stringifyQuery, // 序列化query参数
    parseQuery: parseQuery, // 反序列化query参数
    routes
});

export default router
