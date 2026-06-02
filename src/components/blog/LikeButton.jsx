import { useDispatch } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { toggleLikeBlog } from "../../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const LikeButton = ({ blog }) => {

    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLike = () => {
        isAuthenticated ? dispatch(toggleLikeBlog(blog._id)) : navigate("/login")
    }

    console.log(blog)
    return (
        <button
            onClick={handleLike}
            className="flex items-center space-x-2 hover:text-violet-600 transition-colors"
        >
            {blog.isLiked ? (
                <AiFillLike className="text-[20px]" />
            ) : (
                <AiOutlineLike className="text-[20px]" />
            )}

            <span className="text-xs font-semibold text-slate-500">
                {blog.totalLikes || 0}
            </span>
        </button>
    )
}

export default LikeButton
