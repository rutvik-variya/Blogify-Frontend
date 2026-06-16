import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryForm from "../../components/category/CategoryForm";

const EditCategory = () => {
    const { id } = useParams();
    const category = useSelector((state) =>
        state.adminDashBoard?.categories?.find((item) => item._id === id) ||
        state.category?.categories?.find((item) => item._id === id)
    );

    return (
        <div className="space-y-6 text-left font-sans max-w-xl mx-10">
            <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Modify Category</h2>
                <p className="text-xs text-slate-400 mt-0.5">Update configuration details for this entry.</p>
            </div>
            <div className="w-full bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm">
                <CategoryForm mode="edit" category={category} />
            </div>
        </div>
    );
};

export default EditCategory;