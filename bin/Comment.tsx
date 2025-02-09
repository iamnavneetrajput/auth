import React from 'react';
import { FaRegComment } from "react-icons/fa";
import { AiOutlineExpand } from "react-icons/ai";
import GridItem from '../src/pages/login/components/GridItem';

const Comment: React.FC = () => {
    return (
        <div className="div4">
            <GridItem
                icon={<FaRegComment />}
                title="Comments"
                expandIcon={<AiOutlineExpand />}
                navigateTo="/comments"
                image=''
                text='Lorem ispue da content wjshrjw'
                button={<AiOutlineExpand />}
            />
        </div>
    );
};

export default Comment;