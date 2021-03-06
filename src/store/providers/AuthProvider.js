import React, { useState } from 'react';

import { AuthContext } from '../Context';

export default ({ children }) => {

    const [auth, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}
