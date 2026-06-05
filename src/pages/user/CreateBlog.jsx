import BlogForm from "../../components/blog/BlogForm"
const CreateBlog = () => {
    return (
        <div>
            <div className="max-w-7xl m-auto py-20">
                <h1 className="text-3xl font-bold mb-6">
                    Create Blog
                </h1>

                <BlogForm />
            </div>

        </div>
    )
}

export default CreateBlog
