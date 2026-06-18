import DOMPurify from "dompurify";

const BlogContent = ({ content }) => {
    return (
        <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content),
            }}
        />
    );
};

export default BlogContent;