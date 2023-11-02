import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mx-auto mt-14">
            {children}
        </div>
    )
};

export default Layout;