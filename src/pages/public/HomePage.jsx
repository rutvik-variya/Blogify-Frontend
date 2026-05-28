import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getCateories } from "../../features/category/categorySlice"

import HeroSection from "../../components/home/HeroSection"
import CategorySection from "../../components/home/CategorySection"
import LatestBlogSection from "../../components/home/LatestBlogSection";
const HomePage = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getCateories())
    }, [dispatch])

    return (
        <div>
            <HeroSection />

            <CategorySection
                categories={categories}
                loading={loading}
            />

            {/* latest blog */}
            <LatestBlogSection />
        </div>
    )
}

export default HomePage
