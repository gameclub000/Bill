import Head from 'next/head';
import { Layout, Divider, Space } from 'antd';
import styles from '@/styles/Home.module.css';
import BillList from '@/components/containers/BillList/BillList';

const { Footer, Content } = Layout;

export default function Home() {
    return (
        <div>
            <Head>
                <title>Bill</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Content style={{ padding: '40px' }}>
                    <div className={styles.content}>
                        <div>表单</div>
                        <Divider />
                        <Space>
                            <BillList />
                            <Divider type="vertical" />
                            <div>图表</div>
                        </Space>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Bill ©2020 Created by gameclub000</Footer>
            </Layout>
        </div>
    );
}
