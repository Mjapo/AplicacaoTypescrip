import { ReactNode } from "react";
import Menu from "../Menu/Menu";


type Ilayout = {
    children:ReactNode
}

const Layout = ({children}: Ilayout) => {
    return (
        <div className='container-fluid'>
            <Menu />
            <div className='container'>
                <div className='row'>
                  {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
