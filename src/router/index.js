import React from 'react'

const routes = [
    {
        title: '首页',
        icon: '',
        path: '/index',
        component: () => import('@/views/index'),
        // auth: '',
        // permission: '',
        // hidden: '',
        // redirect: '',
        // children: [],
    },
    {
        title: 'Hello',
        icon: '',
        path: '/Hello',
        component: () => import('@/components/Hello'),
    },
    {
        title: 'ConditionRender',
        icon: '',
        path: '/ConditionRender',
        component: () => import('@/components/ConditionRender'),
    },
    {
        title: 'Warning',
        icon: '',
        path: '/Warning',
        component: () => import('@/components/Warning'),
    },
    {
        title: 'ListKey',
        icon: '',
        path: '/ListKey',
        component: () => import('@/components/ListKey'),
    },
    {
        title: 'Form',
        icon: '',
        path: '/Form',
        component: () => import('@/components/Form'),
    },
    {
        title: 'StateUp',
        icon: '',
        path: '/StateUp',
        component: () => import('@/components/StateUp'),
    },
    {
        title: 'CombinationInheritance',
        icon: '',
        path: '/CombinationInheritance',
        component: () => import('@/components/CombinationInheritance'),
    },
    {
        title: 'todo',
        icon: '',
        path: '/todo',
        component: () => import('@/components/todo'),
    },
];

export const NoMatch = () => (<h3 style={{color: 'red'}}>404</h3>);

export default routes;
