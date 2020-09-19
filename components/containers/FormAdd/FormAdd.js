import PropTypes from 'prop-types';
import { DatePicker, Modal, Select, Form, Input, Button, Radio } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const typeDict = [
    { id: 0, name: '支出' },
    { id: 1, name: '收入' }
];

function FormAdd({ categoryDict, onAdd }) {
    const [showModal, toggleModal] = useState();
    const [form] = Form.useForm();

    const onSubmit = (values) => {
        const { type, category, amount, time } = values;
        onAdd({
            type: Number(type),
            category: String(category),
            amount: Number(amount),
            time: time.unix()
        });
        toggleModal(!showModal);
    };

    return (
        <>
            <Button type="primary" onClick={() => toggleModal(!showModal)}>
                新增账单
            </Button>
            <Modal
                title="新增账单"
                visible={showModal}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            form.resetFields();
                            onSubmit(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
                onCancel={() => toggleModal(!showModal)}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public'
                    }}
                >
                    <Form.Item
                        name="time"
                        label="时间"
                        rules={[
                            {
                                required: true,
                                message: 'Please input time!'
                            }
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="类型"
                        rules={[
                            {
                                required: true,
                                message: 'Please select category!'
                            }
                        ]}
                    >
                        <Select>
                            {categoryDict.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="收入/支出"
                        rules={[
                            {
                                required: true,
                                message: 'Please select type!'
                            }
                        ]}
                    >
                        <Select>
                            {typeDict.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        label="金额"
                        rules={[
                            {
                                required: true,
                                message: 'Please input amount!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

FormAdd.propTypes = {
    categoryDict: PropTypes.array,
    onAdd: PropTypes.func
};

FormAdd.defaultProps = {
    categoryDict: [],
    onAdd: (e) => {}
};

export default FormAdd;
