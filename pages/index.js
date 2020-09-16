import Head from 'next/head';
import { Layout, Menu, Breadcrumb, Divider, Card, Row, Col } from 'antd';
import styles from '@/styles/Home.module.css';

const { Header, Footer, Content } = Layout;

export default function Home() {
    return (
        <div>
            <Head>
                <title>Bill</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Header className={styles.header}>
                    <img className={styles.logo} src="/static/img/logo/logo.png" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">Bill List</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 40px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill List</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.content}>
                        <div>表单</div>
                        <Divider />
                        <Row>
                            <Col span={12}>表格</Col>
                            <Col span={12}>图表</Col>
                        </Row>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Bill ©2020 Created by gameclub000</Footer>
            </Layout>
        </div>
    );
}
