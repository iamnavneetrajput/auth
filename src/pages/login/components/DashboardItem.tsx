// DashboardItem.tsx
import React from 'react';
import { AiOutlineExpand } from "react-icons/ai";
import GridItem from './GridItem';
import ProfileEditor from './ProfileEditor';  // Import ProfileEditor

interface DashboardItemProps {
    title: string;
    icon: JSX.Element;
    navigateTo: string;
    divClass: string;
    content?: string | number;
    image?: string;
}

const DashboardItem: React.FC<DashboardItemProps> = ({ title, icon, navigateTo, divClass, content, image }) => {
    return (
        <div className={divClass}>
            {divClass === "account" ? (
                <ProfileEditor />  // Render ProfileEditor only if it's the Account section
            ) : (
                <GridItem
                    icon={icon}
                    title={title}
                    expandIcon={<AiOutlineExpand />}
                    navigateTo={navigateTo}
                    image={image || "https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png"}
                    text={content ? content.toString() : ""}
                    button={<AiOutlineExpand />}
                />
            )}
        </div>
    );
};

export default DashboardItem;
