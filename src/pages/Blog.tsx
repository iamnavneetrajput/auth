import BlogCard from "../components/particles/BlogCard";

const BlogList = () => {
  return (
    <div className="main">
      <BlogCard
        author="Navneet Singh"
        date="Feb 3 (3 days ago)"
        title="this is the title of the blog that design same as shown in the image and make responsive"
        tags={["webdev", "Programming", "ai"]}
        likes={120}
        comments={22}
        readTime="2 min"
      />
      <BlogCard
        author="Abhinit Singh"
        date="Feb 2 (4 days ago)"
        title="this is the title of the blog that design same as shown in the image and make responsive"
        tags={["webdev", "Programming", "ai&ml"]}
        likes={120}
        comments={25}
        readTime="3 min"
      />
    </div>
  );
};

export default BlogList;
