import { FC } from 'react';
import PageHeader from '../components/particles/PageHeader';

const Home: FC = () => {

    return (
        <div className='main'>
            <PageHeader
                title="Welcome to Home"
                paragraph="This is a paragraph of text specific to the Home Page."
                buttonText="Explore Courses"
                buttonLink="/course"
                className="home-image"
            />
        </div>
    );
};

export default Home;