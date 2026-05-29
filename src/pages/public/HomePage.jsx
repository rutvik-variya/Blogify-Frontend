import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getCateories } from "../../features/category/categorySlice"
import { latestBlog } from "../../features/blog/blogSlice";

import HeroSection from "../../components/home/HeroSection"
import CategorySection from "../../components/home/CategorySection"
import LatestBlogSection from "../../components/home/LatestBlogSection";
const HomePage = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.category);

    const { blogs, loading: blogLoading, error } = useSelector((state) => state.blog)

    useEffect(() => {
        dispatch(getCateories())
        dispatch(latestBlog())
    }, [dispatch])


    return (
        <div>
            <HeroSection />

            <CategorySection
                categories={categories}
                loading={loading}
            />

            <LatestBlogSection
                blogs={blogs.blog || []}
                loading={blogLoading}
                error={error}
            />
        </div>
    )
}

export default HomePage
