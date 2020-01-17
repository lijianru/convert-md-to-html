import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import './theme.css'
import * as readme from './README.md'

const { Content, Footer, Sider } = Layout;

const App = () => (
  <BrowserRouter>
    <Layout>
      <Sider>
        <div>LOGO</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          <Menu.Item key="0"><Link to="/">前言</Link></Menu.Item>
          <Menu.Item key="1"><Link to="/readme">Readme</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content className={'container'}>
          <div className={'content'}>
            <Switch>
              <Route path="/" exact><div>前言</div></Route>
              <Route path="/readme"><div dangerouslySetInnerHTML={{__html: readme.default}}></div></Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))
