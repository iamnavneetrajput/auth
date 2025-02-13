import { FC } from 'react';
import Sidebar from '../components/layout/Sidebar';
import BlogPost from '../components/particles/BlogPost';

const Home: FC = () => {

    return (
        <div className='main'>

            <Sidebar />
            <BlogPost author={'me'} date={'24 feb'} timeAgo={'4 day'} title={'How to implement'} tags={["ai"]} likes={10} comments={20} readTime={3} />
            <BlogPost author={'me'} date={'24 feb'} timeAgo={'4 day'} title={'How to implement'} tags={["ai"]} likes={10} comments={20} readTime={3} />
            <BlogPost author={'me'} date={'24 feb'} timeAgo={'4 day'} title={'How to implement'} tags={["ai"]} likes={10} comments={20} readTime={3} />
            <BlogPost author={'me'} date={'24 feb'} timeAgo={'4 day'} title={'How to implement'} tags={["ai"]} likes={10} comments={20} readTime={3} />
            <BlogPost author={'me'} date={'24 feb'} timeAgo={'4 day'} title={'How to implement'} tags={["ai"]} likes={10} comments={20} readTime={3} />

        </div>
    );
};

export default Home;