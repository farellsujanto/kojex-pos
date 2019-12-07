import React, { useState, useEffect } from 'react';

import { firebaseApp } from '../utils/Firebase';

import DataTables from '../components/DataTables';

import { Table, Modal, Form, Button, Col, Row, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

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

    function addData() {
        const staffData = {
            beautician: beautician,
            doctor: doctor,
            nurse: nurse
        }
        handleConfirmation(qty, staffData);
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
        console.log(cashierDatas)
    }

    const headers = ["#", "Nama", "Harga", "Beautician", "Dokter", "Perawat", "Keterangan", ""];
    const suffix = ["", "", "CURR", " %", " %", " %", "", "FUN"];

    return (
        <>
            <CashierTable
                tax={tax}
                cashierDatas={cashierDatas}
            />
             <Button variant="primary" onClick={addDataToDb}>
                    Submit
                </Button>
            <DataTables items={services} headers={headers} suffix={suffix} />
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