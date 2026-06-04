import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getComments } from "../../features/comment/commentSlice"
import { postComment } from "../../features/comment/commentSlice"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "../../features/comment/commentSchema";


const CommentSection = ({ blogId }) => {
    const dispatch = useDispatch();
    const { comment, loading, error } = useSelector((state) => state.comment)
    const { isAuthenticated } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(commentSchema) })


    useEffect(() => {
        dispatch(getComments(blogId))
    }, [blogId, dispatch])


    const handleComment = async (data) => {
        const result = await dispatch(postComment({ blogId, commentData: data }));
        if (postComment.fulfilled.match(result)) {
            reset();
            dispatch(getComments(blogId));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
                <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100 max-w-md shadow-sm">
                    <div className="text-red-500 font-semibold text-lg mb-2">Oops! Something went wrong</div>
                    <div className="text-red-600/80 text-sm">{error}</div>
                </div>
            </div>
        );
    }

    const comments = Array.isArray(comment?.comment) ? comment.comment : [];

    return (
        <div>
            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased mt-7 rounded-2xl">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comment Section</h2>
                    </div>
                    {
                        (isAuthenticated) ?
                            <form
                                onSubmit={handleSubmit(handleComment)}
                                className="mb-6">
                                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea
                                        id="comment"
                                        rows="6"
                                        {...register("content")}
                                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                        placeholder="Write a comment..."
                                    ></textarea>



                                </div>
                                {errors.content && (
                                    <p className="text-violet-500 text-sm my-3">
                                        {errors.content.message}
                                    </p>
                                )}
                                <button type="submit"
                                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white  bg-violet-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                    Post comment
                                </button>
                            </form>
                            : null

                    }

                    <article className="py-6 text-base bg-white rounded-lg dark:bg-gray-900">
                        {!loading && comments.length === 0 && (
                            <div className="col-span-full text-center py-24 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-lg mx-auto w-full px-6">
                                <div className="text-slate-400 text-5xl mb-4">🔍</div>
                                <p className="text-slate-800 text-xl font-bold mb-1">No Comments found</p>
                                <p className="text-slate-400 text-sm">We couldn't find any articles matching your search criteria.</p>
                            </div>
                        )}
                        {
                            !loading && comments.map((comment) => (
                                <div className="my-5" key={comment._id}>
                                    <footer className="flex justify-between items-center">
                                        <div className="flex items-center mb-1">
                                            <div className="flex items-center mr-3">
                                                <div className="w-9 h-9 bg-violet-500 text-white rounded-full flex items-center justify-center font-bold uppercase text-sm shadow-sm ring-2 ring-white me-2">
                                                    {comment?.user?.name?.[0] || "A"}
                                                </div>

                                                <span className="text-sm text-gray-900 dark:text-white font-semibold capitalize">
                                                    {comment?.user?.name || "Anonymous"}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {comment?.createdAt
                                                    ? new Date(comment.createdAt).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )
                                                    : "Recent"}
                                            </p>
                                        </div>
                                    </footer>
                                    <p className="text-gray-500 dark:text-gray-400 py-2 px-1">
                                        {comment.content}
                                    </p>

                                </div>
                            ))
                        }

                    </article>
                </div>
            </section>
        </div>
    )
}

export default CommentSection
