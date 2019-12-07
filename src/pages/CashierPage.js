import React, { useState, useEffect } from 'react';

import { firebaseApp } from '../utils/Firebase';

import DataTables from '../components/DataTables';

import { Table, Modal, Form, Button, Col, Row } from 'react-bootstrap';

function CashierTableRow({ index, data }) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{data.name}</td>
            <td>{Number(data.qty)}</td>
            <td>{data.price}</td>
            <td>{data.price * data.qty}</td>
        </tr>
    );
}

function CashierTable({ cashierDatas, tax }) {

    function getTotalPrice() {
        let output = 0;
        if (cashierDatas.length) {
            cashierDatas.forEach((cashierData) => {
                output += cashierData.qty * cashierData.price
            });
        }
        return output;
    }

    return (
        <Row>
            <Col>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Barang</th>
                            <th>Jumlah</th>
                            <th>Harga Satuan</th>
                            <th>Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cashierDatas ?
                                cashierDatas.map((data, index) => {
                                    return (
                                        <CashierTableRow
                                            key={index}
                                            index={index}
                                            data={data}
                                        />
                                    );
                                }) : null
                        }
                    </tbody>
                </Table>
            </Col>
            <Col>
                <Row>Total : {getTotalPrice()}</Row>
                <Row>Tax {tax} % : {getTotalPrice() * (100 + tax) / 100}</Row>
            </Col>
        </Row>
    );
}

function AddModal({ show, handleClose, handleConfirmation }) {

    const [qty, setQty] = useState(0);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tambahka data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    placeholder="Quantity"
                    value={qty}
                    type="number"
                    onChange={(e) => setQty(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={handleClose}>
                    Close
            </Button>
                <Button variant="primary" onClick={() => handleConfirmation(qty)}>
                    Tambahkan
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default () => {

    const [services, setServices] = useState([[]]);
    const [currAddData, setCurrAddData] = useState({});

    const [showAddModal, setShowAddModal] = useState(false);

    const [cashierDatas, setCashierDatas] = useState([]);
    const [tax, setTax] = useState(0);


    useEffect(() => {
        const unsubscribeServices = firebaseApp.firestore()
            .collection('clinics')
            .doc("GABRIEL")
            .collection("services")
            .onSnapshot((snapshot) => {
                let newServices = [];
                let index = 0;
                snapshot.forEach((snap) => {
                    const newService = [
                        ++index,
                        snap.data().name,
                        snap.data().price,
                        snap.data().fee.beautician,
                        snap.data().fee.doctor,
                        snap.data().fee.nurse,
                        snap.data().desc,
                        {
                            fun: () => {
                                setShowAddModal(true);
                                setCurrAddData(
                                    {
                                        name: snap.data().name,
                                        price: snap.data().price,
                                        fee: {
                                            beautician: snap.data().fee.beautician,
                                            doctor: snap.data().fee.doctor,
                                            nurse: snap.data().fee.nurse,
                                        }
                                    }
                                );

                            },
                            name: "AAA"
                        }

                    ];
                    newServices.push(newService);
                });
                setServices(newServices);
            });

        const unsubscribeTax = firebaseApp.firestore()
            .collection('clinics')
            .doc("GABRIEL")
            .collection("constants")
            .doc("tax").onSnapshot((snap) => {
                setTax(snap.data().value)
            });
        return () => {
            unsubscribeServices();
            unsubscribeTax();
        }
    }, []);

    function insertToCashierTable(qty) {
        setShowAddModal(false);
        let dataToInsert = currAddData;
        dataToInsert.qty = qty;
        setCashierDatas([...cashierDatas, dataToInsert]);
    }

    const headers = ["#", "Nama", "Harga", "Beautician", "Dokter", "Perawat", "Keterangan", ""];
    const suffix = ["", "", "CURR", " %", " %", " %", "", "FUN"];

    return (
        <div>
            <CashierTable
                tax={tax}
                cashierDatas={cashierDatas}
            />
            <DataTables items={services} headers={headers} suffix={suffix} />
            <AddModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                handleConfirmation={insertToCashierTable}
            />
        </div>
    );
}