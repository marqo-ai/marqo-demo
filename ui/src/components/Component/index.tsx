import React, { Fragment } from "react"

const Component: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Fragment>
        {children}
    </Fragment>
}
export default Component;