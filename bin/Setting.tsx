import { GoGear } from "react-icons/go";
import { AiOutlineExpand } from "react-icons/ai";
import GridItem from '../src/pages/login/components/GridItem';

const Settings = () => {
    return (
        <div className="div3">
            <GridItem
                icon={<GoGear />}
                title="Settings"
                expandIcon={<AiOutlineExpand />}
                navigateTo="/settings"
                image=''
                text='Lorem ispue da content wjshrjw'
                button={<AiOutlineExpand />}
            />
        </div>
    );
};

export default Settings;