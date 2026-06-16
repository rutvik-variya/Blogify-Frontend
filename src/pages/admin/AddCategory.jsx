import CategoryForm from "../../components/category/CategoryForm";

const AddCategory = () => {
    return (
        <div className="space-y-6 text-left font-sans max-w-xl mx-10">
            <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Create Category</h2>
                <p className="text-xs text-slate-400 mt-0.5">Add a new category classification to your system.</p>
            </div>
            <div className="w-full bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm">
                <CategoryForm
                    mode="create"
                />
            </div>
        </div>
    );
};

export default AddCategory;