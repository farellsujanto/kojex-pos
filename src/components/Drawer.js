import React, { useContext } from 'react';

import { PathContext } from '../store/Context';

import {
    Container, Button, Accordion,
    // Card, 
} from 'react-bootstrap';
// import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

// import { RoleContext } from '../store/Context';

// function CustomToggle({ children, eventKey }) {
//     const decoratedOnClick = useAccordionToggle(eventKey, () => { });

//     return (
//         <Button
//             type="button"
//             onClick={decoratedOnClick}
//             variant="light"
//             block >
//             {children}
//         </Button>
//     );

// }

// function OrderAccordion() {
//     const [, setPath] = useContext(PathContext);
//     return (
//         <div>
//             <CustomToggle eventKey="0">
//                 Rekap Order
//             </CustomToggle>
//             <Accordion.Collapse eventKey="0">
//                 <Card.Body>
//                     <Button variant="light" onClick={() => setPath('/order/list')} block>
//                         List Rekap Order
//                     </Button>
//                     <Button variant="light" onClick={() => setPath('/order/add')} block>
//                         Tambah Rekap Order
//                     </Button>
//                 </Card.Body>
//             </Accordion.Collapse>
//             <br />
//         </div>
//     );
// }

// function ShoppingAccordion() {
//     const [, setPath] = useContext(PathContext);
//     return (
//         <div>
//             <CustomToggle eventKey="1">
//                 Rekap Belanja
//             </CustomToggle>
//             <Accordion.Collapse eventKey="1">
//                 <Card.Body>
//                     <Button variant="light" onClick={() => setPath('/shopping/list')} block>
//                         List Rekap Belanja
//                     </Button>
//                     <Button variant="light" onClick={() => setPath('/shopping/add')} block>
//                         Tambah Rekap Belanja
//                     </Button>
//                 </Card.Body>
//             </Accordion.Collapse>
//             <br />
//         </div>
//     );
// }


// function MaintenanceAccordion() {
//     const [, setPath] = useContext(PathContext);
//     return (
//         <div>
//             <CustomToggle eventKey="2">
//                 Maintenance
//             </CustomToggle>
//             <Accordion.Collapse eventKey="2">
//                 <Card.Body>
//                     <Button variant="light" onClick={() => setPath('/product/list')} block>
//                         Daftar Produk
//                     </Button>
//                     <Button variant="light" onClick={() => setPath('/restaurant/list')} block>
//                         Daftar Restoran
//                     </Button>
//                     <Button variant="light" onClick={() => setPath('/user/list')} block>
//                         Daftar User
//                     </Button>
//                 </Card.Body>
//             </Accordion.Collapse>
//             <br />
//         </div>
//     );
// }

function ServiceMenu() {

    const [, setPath] = useContext(PathContext);

    return (
        <>
            <Button variant="light" onClick={() => setPath('/cashier')} block>
                Kasir
            </Button>
        </>
    );
}

export default () => {

    const [, setPath] = useContext(PathContext);
    // const [role] = useContext(RoleContext);

    return (
        <Container>
            <Accordion>
                <Button variant="light" onClick={() => setPath('/')} block>
                    Home
                </Button>
                <br />
                <ServiceMenu />
                {/* {
                    role !== 'none' ?
                        <>
                            <OrderAccordion />
                            <ShoppingAccordion />
                        </> : null
                }

                {role === 'admin' ? <MaintenanceAccordion /> : null} */}
            </Accordion>
        </Container>
    );
}