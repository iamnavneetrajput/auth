import React from 'react';
import { AiOutlineExpand } from "react-icons/ai";
import { CiBookmark } from 'react-icons/ci';
import GridItem from '../src/pages/login/components/GridItem';

const Bookmarks: React.FC = () => {
    return (
        <div className="div5">
            <GridItem
                icon={<CiBookmark />}
                title="Bookmarks"
                expandIcon={<AiOutlineExpand />}
                navigateTo="/bookmarks"
                image=''
                text='Lorem ispue da content wjshrjw'
                button={<AiOutlineExpand />}
            />
        </div>
    );
};

export default Bookmarks;