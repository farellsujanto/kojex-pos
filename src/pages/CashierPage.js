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

function CashierTableRow({ index, data }) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{data.name}</td>
            <td>{Number(data.qty)}</td>
            <td>{numberToLocalCurrency(data.price)}</td>
            <td>{numberToLocalCurrency(data.price * data.qty)}</td>
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
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
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
                if (staff.role === role) {
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
            console.log("A")
            window.alert("Tolong isi semua kolom yang kosong.");
            return;
        }

        if (fee) {
            if (fee.beautician && !beautician) {
                console.log("B")
                window.alert("Tolong isi semua kolom yang kosong.");
                return;
            }

            if (fee.nurse && !nurse) {
                console.log("C")
                window.alert("Tolong isi semua kolom yang kosong.");
                return;
            }

            if (fee.doctor && !doctor) {
                console.log("D")
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

export default () => {

    const [services, setServices] = useState([[]]);
    const [staffs, setStaffs] = useState([[]]);

    const [currAddData, setCurrAddData] = useState({});

    const [showAddModal, setShowAddModal] = useState(false);

    const [cashierDatas, setCashierDatas] = useState([]);
    const [tax, setTax] = useState(0);


    function getTotalPrice() {
        let output = 0;
        if (cashierDatas.length) {
            cashierDatas.forEach((cashierData) => {
                output += cashierData.qty * cashierData.price
            });
        }
        return output;
    }

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

    function insertToCashierTable(qty, staff) {
        setShowAddModal(false);
        let dataToInsert = currAddData;
        dataToInsert.qty = qty;
        dataToInsert.staff = staff;
        setCashierDatas([...cashierDatas, dataToInsert]);
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
                <Col md="8">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Card tables</h3>
                        </CardHeader>
                        <CashierTable
                            tax={tax}
                            cashierDatas={cashierDatas}
                        />
                    </Card>
                </Col>

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
                                            <td><b>Total :</b></td>
                                            <td>{numberToLocalCurrency(getTotalPrice())}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Tax {tax} % :</b></td>
                                            <td>{numberToLocalCurrency(getTotalPrice() * (100 + tax) / 100)}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Button variant="primary" onClick={addDataToDb}>
                            Submit
                        </Button>
                    </Card>
                </Col>
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
