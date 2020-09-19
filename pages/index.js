import Head from 'next/head';
import { STATUS_IDLE, STATUS_PENDING } from '@/config/contants';
import { Layout, Divider, Space } from 'antd';
import styles from '@/styles/Home.module.css';
import BillList from '@/components/containers/BillList/BillList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getBillList,
    selectVisibleBill,
    setMonth,
    resetMonth,
    setCategory,
    resetCategory
} from '@/store/modules/billSlice';
import {
    getBillCategoryList,
    selectBillCategory
} from '@/store/modules/billCategorySlice';
import FilterForm from '@/components/containers/FilterForm/FilterForm';

const { Footer, Content } = Layout;

function Home() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.bill.status);
    const list = useSelector(selectVisibleBill);
    const categoryStatus = useSelector((state) => state.billCategory.status);
    const defaultDate = useSelector((state) => state.bill.date);
    const defaultCategory = useSelector((state) => state.bill.category);
    const categoryDict = useSelector(selectBillCategory);
    let loading = false;

    if (status === STATUS_IDLE || status === STATUS_PENDING) {
        loading = true;
    }

    useEffect(() => {
        if (status === STATUS_IDLE) {
            dispatch(getBillList());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (categoryStatus === STATUS_IDLE) {
            dispatch(getBillCategoryList());
        }
    }, [categoryStatus, dispatch]);

    return (
        <div>
            <Head>
                <title>Bill</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Content style={{ padding: '40px' }}>
                    <div className={styles.content}>
                        <FilterForm
                            defaultMonth={defaultDate}
                            defaultCategory={defaultCategory}
                            categoryDict={categoryDict}
                            onChangeMonth={(date, dateString) =>
                                dispatch(setMonth({ date, dateString }))
                            }
                            onChangeCategory={(category) =>
                                dispatch(setCategory(category))
                            }
                            onReset={() => {
                                dispatch(resetMonth());
                                dispatch(resetCategory());
                            }}
                            onAdd={() => dispatch(resetCategory())}
                        />
                        <Divider />
                        <Space>
                            <BillList
                                dataSource={list}
                                categoryDict={categoryDict}
                                loading={loading}
                            />
                            <Divider type="vertical" />
                            <div>图表</div>
                        </Space>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Bill ©2020 Created by gameclub000
                </Footer>
            </Layout>
        </div>
    );
}

export default Home;
