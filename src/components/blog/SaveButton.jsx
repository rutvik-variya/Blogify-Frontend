import { useDispatch } from "react-redux";
import { toggleBookBlog } from "../../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { BsFillSave2Fill } from "react-icons/bs";
import { BsSave } from "react-icons/bs";

const SaveButton = ({ blog }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBookmark = () => {
        isAuthenticated ? dispatch(toggleBookBlog(blog._id)) : navigate("/login")
    }

    const isBookMark = blog.bookmarks?.some(
        (id) => String(id) === String(user?.id)
    );

    return (
        <button
            onClick={handleBookmark}
            className="flex items-center space-x-2 hover:text-violet-600 transition-colors"
        >
            {isBookMark ? (
                <BsFillSave2Fill className="text-[20px]" />
            ) : (
                <BsSave className="text-[20px]" />
            )}
        </button>
    )
}

export default SaveButton
