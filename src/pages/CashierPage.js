import React, { useState, useEffect } from 'react';

import { firebaseApp } from '../utils/Firebase';

import DataTables from '../components/DataTables';

import { Table, Modal, Form, Button, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

import {
    Card,
    CardHeader,
    Col,
    Row
} from "reactstrap";

function numberToLocalCurrency(value) {
    return Number(value).toLocaleString('id');
}

function CashierTableRow({ index, data, removeCashierDataOn, setCashierDataDiscount }) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{data.name}</td>
            <td>{Number(data.qty)}</td>
            <td>{numberToLocalCurrency(data.price)}</td>
            <td>
                <Form.Group>
                    <Form.Control
                        value={data.disc}
                        type="number"
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value >= 0 && value <= 100) {
                                setCashierDataDiscount(index, Number(value))
                            }
                        }}
                    />
                </Form.Group>
            </td>
            <td>{numberToLocalCurrency(data.price * data.qty)}</td>
            <td>
                <Button
                    variant="danger"
                    onClick={() => removeCashierDataOn(index)}
                >
                    -
                </Button>
            </td>
        </tr>
    );
}

function CashierTable({ cashierDatas, removeCashierDataOn, setCashierDataDiscount }) {

    return (
        <Row>
            <Col>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th>#</th>
                            <th>Barang</th>
                            <th>Jumlah</th>
                            <th>Harga Satuan</th>
                            <th>Diskon</th>
                            <th>Sub Total</th>
                            <th></th>
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
                                            removeCashierDataOn={removeCashierDataOn}
                                            setCashierDataDiscount={setCashierDataDiscount}
                                        />
                                    );
                                }) : null
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
}

function AddModal({ show, handleClose, handleConfirmation, fee, staffs }) {

    const [qty, setQty] = useState(0);

    const [beautician, setBeautician] = useState('');
    const [doctor, setDoctor] = useState('');
    const [nurse, setNurse] = useState('');

    function getStaff(role) {
        let output = [];
        if (staffs.length) {
            staffs.forEach((staff) => {
                if (
                    staff.role === role ||
                    ((staff.role === 'beautician') && (role === 'nurse')) ||
                    ((staff.role === 'nurse') && (role === 'beautician'))
                ) {
                    output.push(staff.name);
                }
            });
        }

        return output;
    }

    function resetData() {
        setQty(0);
        setBeautician('');
        setDoctor('');
        setNurse('');
    }

    function addData() {


        if (!qty) {
            window.alert("Tolong isi semua kolom yang kosong.");
            return;
        }

        if (fee) {
            if (fee.beautician && !beautician) {
                window.alert("Tolong isi semua kolom yang kosong.");
                return;
            }

            if (fee.nurse && !nurse) {
                window.alert("Tolong isi semua kolom yang kosong.");
                return;
            }

            if (fee.doctor && !doctor) {
                window.alert("Tolong isi semua kolom yang kosong.");
                return;
            }
        }

        const staffData = {
            beautician: beautician,
            doctor: doctor,
            nurse: nurse
        }
        handleConfirmation(Number(qty), staffData);
        resetData();
    }

    function StaffDropdown({ title, role, changeStaff, staffValue }) {
        return (
            <Form.Group>
                <Col>
                    <Form.Label>{title}</Form.Label>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <DropdownButton id="dropdown-item-button" title={title}>
                            {
                                getStaff(role).map((staff, index) => {
                                    return (
                                        <Dropdown.Item
                                            key={index}
                                            as="button"
                                            onClick={() => changeStaff(staff)}
                                        >
                                            {staff}
                                        </Dropdown.Item>
                                    );
                                })
                            }
                        </DropdownButton>
                        <Form.Control value={staffValue} readOnly />
                    </InputGroup>
                </Col>
            </Form.Group>
        );
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tambahka data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Col>
                        <Form.Label>Jumlah</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            value={qty}
                            type="number"
                            onChange={(e) => setQty(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                {
                    fee ? (
                        fee.beautician ? (
                            <StaffDropdown
                                title="Beautician"
                                role="beautician"
                                changeStaff={setBeautician}
                                staffValue={beautician}
                            />
                        ) : null
                    ) : null
                }
                {
                    fee ? (
                        fee.doctor ? (
                            <StaffDropdown
                                title="Doctor"
                                role="doctor"
                                changeStaff={setDoctor}
                                staffValue={doctor}
                            />
                        ) : null
                    ) : null
                }
                {
                    fee ? (
                        fee.nurse ? (
                            <StaffDropdown
                                title="Nurse"
                                role="nurse"
                                changeStaff={setNurse}
                                staffValue={nurse}
                            />
                        ) : null
                    ) : null
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={handleClose}>
                    Close
            </Button>
                <Button variant="primary" onClick={addData}>
                    Tambahkan
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function ReceiptContainer({ totalPrice, tax, addDataToDb, totalCut }) {

    function calculateTax(price) {
        return tax === 0 ? 0 : (price * tax / 100);
    }

    return (
        <Col md="4">
            <Card className="shadow">
                <CardHeader className="border-0">
                    <h3 className="mb-0">Card tables</h3>
                </CardHeader>
                <Row>
                    <Col>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Biaya</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><b>Total Harga :</b></td>
                                    <td>{numberToLocalCurrency(totalPrice)}</td>
                                </tr>
                                <tr>
                                    <td><b>Total Potongan :</b></td>
                                    <td>{numberToLocalCurrency(totalCut)}</td>
                                </tr>
                                <tr>
                                    <td><b>Tax {tax} % :</b></td>
                                    <td>{numberToLocalCurrency(calculateTax((totalPrice - totalCut)))}</td>
                                </tr>
                                <tr>
                                    <td><b>Biaya Yang Harus Dibayar :</b></td>
                                    <td>{numberToLocalCurrency(totalPrice - totalCut + calculateTax((totalPrice - totalCut)))}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Button variant="primary" onClick={addDataToDb}>Submit</Button>
            </Card>
        </Col>
    );
}

function CashierContainer({ cashierDatas, removeCashierDataOn, setCashierDataDiscount }) {
    return (
        <Col md="8">
            <Card className="shadow">
                <CardHeader className="border-0">
                    <h3 className="mb-0">Card tables</h3>
                </CardHeader>
                <CashierTable
                    removeCashierDataOn={removeCashierDataOn}
                    cashierDatas={cashierDatas}
                    setCashierDataDiscount={setCashierDataDiscount}
                />
            </Card>
        </Col>
    );
}

export default () => {

    const [services, setServices] = useState([[]]);
    const [staffs, setStaffs] = useState([[]]);

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
                            name: "+ Tambahkan"
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

        const unsubscribeStaffs = firebaseApp.firestore()
            .collection('clinics')
            .doc("GABRIEL")
            .collection("staffs")
            .onSnapshot((snapshot) => {
                let newStaffs = [];
                snapshot.forEach((snap) => {
                    newStaffs.push(snap.data());
                });
                setStaffs(newStaffs);
            });

        return () => {
            unsubscribeServices();
            unsubscribeTax();
            unsubscribeStaffs();
        }
    }, []);

    function getTotalPrice() {
        let output = 0;
        if (cashierDatas.length) {
            cashierDatas.forEach((cashierData) => {
                output += cashierData.qty * cashierData.price
            });
        }
        return output;
    }

    function getTotalCut() {
        let output = 0;
        if (cashierDatas.length) {
            cashierDatas.forEach((cashierData) => {
                output += (cashierData.qty * cashierData.price)  * cashierData.disc / 100;
            });
        }
        return output;
    }

    function removeCashierDataOn(index) {
        let newCashierDatas = [...cashierDatas];
        newCashierDatas.splice(index, 1);
        setCashierDatas(newCashierDatas);
    }

    function insertToCashierTable(qty, staff) {
        setShowAddModal(false);
        let dataToInsert = currAddData;
        dataToInsert.qty = qty;
        dataToInsert.disc = 0;
        dataToInsert.staff = staff;
        setCashierDatas([...cashierDatas, dataToInsert]);
    }

    function setCashierDataDiscount(index, disc) {
        let newCashierDatas = [...cashierDatas];
        newCashierDatas[index].disc = disc;
        setCashierDatas(newCashierDatas);
    }

    function addDataToDb() {

        const today = new Date();
        const date = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear();
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        const salesRef = firebaseApp.firestore()
            .collection('clinics')
            .doc("GABRIEL")
            .collection("sales").doc();

        const salesDataToSave = {
            id: salesRef.id,
            corrected: false,
            sales: cashierDatas,
            date: date,
            time: time,
            tax: tax
        }

        salesRef.set(salesDataToSave)
            .then(() => {
                window.alert("Data Berhasil Ditambah");
            })
            .catch((e) => {
                window.alert("Terjadi Kesalahan Silahkan Coba Lagi");
            });
    }

    const headers = ["#", "Nama", "Harga", "Beautician", "Dokter", "Perawat", "Keterangan", ""];
    const suffix = ["", "", "CURR", " %", " %", " %", "", "FUN"];

    return (
        <>
            <Row>
                <CashierContainer
                    removeCashierDataOn={removeCashierDataOn}
                    tax={tax}
                    cashierDatas={cashierDatas}
                    setCashierDataDiscount={setCashierDataDiscount}
                />

                <ReceiptContainer
                    totalPrice={getTotalPrice()}
                    totalCut={getTotalCut()}
                    tax={tax}
                    addDataToDb={addDataToDb}
                />
            </Row>

            <Row className="mt-3">
                <Col>
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Card tables</h3>
                        </CardHeader>
                        <DataTables items={services} headers={headers} suffix={suffix} />
                    </Card>
                </Col>
            </Row>
            <AddModal
                show={showAddModal}
                fee={currAddData.fee}
                staffs={staffs}
                handleClose={() => setShowAddModal(false)}
                handleConfirmation={insertToCashierTable}
            />
        </>
    );
}
