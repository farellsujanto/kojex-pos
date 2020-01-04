import React, {
    useState
} from 'react';

import {RoleContext} from '../Context';

export default ({ children }) => {

    const [role, setRole] = useState('No Name');

    return (
        <RoleContext.Provider value={[role, setRole]}>
            {children}
        </RoleContext.Provider>
    );
}
