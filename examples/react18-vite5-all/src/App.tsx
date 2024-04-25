/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { List } from 'antd'
import * as Antd from 'antd'
import _ from 'lodash'
import dayjs from 'dayjs'
import ReactDom from 'react-dom/client'
import * as ReactRouter from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

import './App.css'

function App() {
    const data = [
        {
            name: 'React',
            isSame: React === window.React,
        },
        {
            name: 'ReactDom',
            // @ts-ignore
            isSame: ReactDom === window.ReactDOM,
        },
        {
            name: 'ReactRouter',
            // @ts-ignore
            isSame: ReactRouter === window.ReactRouterDOM,
        },
        {
            name: 'lodash',
            // @ts-ignore
            isSame: _ === window._,
        },
        {
            name: 'dayjs',
            // @ts-ignore
            isSame: dayjs === window.dayjs,
        },
        {
            name: 'moment',
            isSame: moment === window.moment,
        },
        {
            name: 'axios',
            // @ts-ignore
            isSame: axios === window.axios,
        },
        {
            name: 'antd',
            // @ts-ignore
            isSame: Antd === window.antd,
        },
    ]

    return (
        <>
            <List
                dataSource={data}
                bordered
                renderItem={item => (
                    <List.Item>
                        {item.name}: {item.isSame ? 'true' : 'false'}
                    </List.Item>
                )}
            ></List>
        </>
    )
}

export default App
