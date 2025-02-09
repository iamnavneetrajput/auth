import React from 'react';
import { CiUser } from 'react-icons/ci';
import { AiOutlineExpand } from "react-icons/ai";
import GridItem from '../src/pages/login/components/GridItem'; // Adjust the import path as necessary

const User: React.FC = () => {
    return (
        <div className="div2">
            <GridItem
                icon={<CiUser />}
                title="Account"
                expandIcon={<AiOutlineExpand />}
                navigateTo="/account"
                image=''
                text='Lorem ispue da content wjshrjw'
                button={<AiOutlineExpand />}
            />

        </div>
    );
};

export default User;