import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, Form, Col, Row, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';


function TableHead({ headers, sortDataByIndex, sortIndex, repeatedIndex }) {
    return (
        <thead>
            <tr>

                {
                    headers ?
                        headers.map((header, index) => {
                            if (sortIndex === index) {
                                if (repeatedIndex) {
                                    return (
                                        <th key={index} style={{ cursor: 'pointer' }} onClick={() => sortDataByIndex(index)}>{header} <FontAwesomeIcon icon={faSortDown} /></th>
                                    );
                                }
                                return (
                                    <th key={index} style={{ cursor: 'pointer' }} onClick={() => sortDataByIndex(index)}>{header} <FontAwesomeIcon icon={faSortUp} /></th>
                                );
                            }
                            return (
                                <th key={index} style={{ cursor: 'pointer' }} onClick={() => sortDataByIndex(index)}>{header} <FontAwesomeIcon icon={faSort} /></th>
                            );
                        }) : null
                }
            </tr>
        </thead>
    );
}

function TableRow({ datas, suffix, rowIndex }) {

    function formatNumber(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <tr>
            {
                datas ?
                    datas.map((data, index) => {
                        if (suffix[index] === "CURR") {
                            return (<td key={index}>{formatNumber(Number(data))}</td>);
                        }
                        if (suffix[index] === "FUN") {
                            // return (<td key={index}><Button onClick={() => data.fun(rowIndex)}>{data.name}</Button></td>);
                            return (<td key={index}><Button variant={data.variant} onClick={data.fun}>{data.name}</Button></td>);
                        }
                        return (<td key={index}>{data}{suffix[index]}</td>);
                    }) : null
            }
        </tr>
    );
}

function TableBody({ items, entries, currentPage, suffix }) {


    function getItemOnPage() {
        let components = [];
        const counter = entries > items.length ? items.length : entries;
        for (let i = 0; i < counter; i++) {
            components.push(
                <TableRow
                    key={i}
                    datas={items[i + entries * currentPage]}
                    suffix={suffix}
                    rowIndex={i}
                />
            );
        }
        return components;
    }

    return (
        <tbody>
            {
                items ? getItemOnPage() : null
            }
        </tbody>
    );
}

function DataTables({ items, headers, suffix }) {

    const [itemsToShow, setItemsToShow] = useState(items);

    const [entries, setEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const [sortIndex, setSortIndex] = useState(null);
    const [repeatedIndex, setRepeatedIndex] = useState(false);

    useEffect(() => {
        setItemsToShow(items);
    }, [items]);

    function filterItem(searchText) {
        setCurrentPage(0);
        if (searchText !== '') {
            let newItems = [];
            items.forEach((itemDatas) => {
                for (let i = 0; i < itemDatas.length; i++) {
                    if (itemDatas[i].toString().toLowerCase().includes(searchText.toLowerCase())) {
                        newItems.push(itemDatas);
                        break
                    }
                }
            });
            setItemsToShow(newItems);
        } else {
            setItemsToShow(items);
        }
    }

    function sortDataByIndex(index) {
        setCurrentPage(0);
        let newItems = [];
        if (sortIndex === index && !repeatedIndex) {
            setRepeatedIndex(true);
            newItems = itemsToShow.sort((a, b) => {
                if (a[index] < b[index]) return 1;
                if (a[index] > b[index]) return -1;
                return 0;
            });
        } else {
            setSortIndex(index);
            setRepeatedIndex(false);
            newItems = itemsToShow.sort((a, b) => {
                if (a[index] < b[index]) return -1;
                if (a[index] > b[index]) return 1;
                return 0;
            });
        }

        setItemsToShow(newItems);
    }



    return (
        <Col md={12}>
            <Row>
                <Col md={1}>Entries</Col>
                <Col md={2}>
                    <Form.Control
                        placeholder="Entries"
                        value={entries}
                        type="number"
                        onChange={(e) => setEntries(e.target.value)}
                    />
                </Col>
                <Col md={{ span: 1, offset: 4 }}>Search</Col>
                <Col md={4}>
                    <Form.Control
                        placeholder="Search..."
                        onChange={(e) => filterItem(e.target.value)}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                <Table striped border="true" hover variant="dark" responsive>
                    <TableHead
                        headers={headers}
                        sortDataByIndex={sortDataByIndex}
                        sortIndex={sortIndex}
                        repeatedIndex={repeatedIndex}
                    />
                    <TableBody
                        items={itemsToShow}
                        entries={entries}
                        currentPage={currentPage}
                        suffix={suffix}
                    />
                </Table>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    Showing {currentPage * entries + 1} to {((currentPage + 1) * entries) > items.length ? items.length : (currentPage + 1) * entries} of {items.length} entries
                </Col>
                
            </Row>
            <Row>
            <Col md={4}>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={itemsToShow.length === 0 ? 1 : entries === 0 ? 1 : Math.ceil(itemsToShow.length / entries)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                        containerClassName={'pagination'}
                        subContainerClassName={'page-item'}
                        activeClassName={'active'}
                        forcePage={currentPage}
                    />
                </Col>
            </Row>

        </Col>
    );
}

export default DataTables;

// export default () => {

//     const headers = ["#", "Name", "Role", "Stat", "Level"];
//     const items = [
//         ["1", "Axe", "Tank", "STR", "10"],
//         ["2", "Arc Warden", "Mid", "AGI", "15"],
//         ["3", "Invoker", "Mid", "INT", "12"],
//         ["4", "Juggernaut", "Carry", "AGI", "11"],
//         ["5", "Bristleback", "Offlane", "STR", "15"],
//     ];

//     return <DataTables items={items} headers={headers} />

// }