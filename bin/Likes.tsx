import React from 'react';
import { CiHeart } from "react-icons/ci";
import { AiOutlineExpand } from "react-icons/ai";
import GridItem from '../src/pages/login/components/GridItem';

const Likes: React.FC = () => {
    return (
        <div className="div1">
            <GridItem
                icon={<CiHeart />}
                title="Likes"
                expandIcon={<AiOutlineExpand />}
                navigateTo="/like"
                image=''
                text='Lorem ispue da content wjshrjw'
                button={<AiOutlineExpand/>}
            />
        </div>
    );
};

export default Likes;