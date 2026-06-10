import { FiBookOpen, FiCheckCircle, FiEdit2, FiHeart, FiMessageSquare, FiBookmark } from "react-icons/fi";

const StatsCards = ({ stats, loading, error }) => {
    if (error) {
        return (
            <div className="bg-violet-50 border border-violet-100 p-4 rounded-xl text-sm font-medium text-violet-600 text-center">
                Failed to load dashboard metrics: {error}
            </div>
        );
    }

    const cardsConfig = [
        { label: "Total Blogs", value: stats?.totalBlogs, icon: FiBookOpen, color: "text-blue-600 bg-blue-50" },
        { label: "Published Blogs", value: stats?.publishedBlogs, icon: FiCheckCircle, color: "text-emerald-600 bg-emerald-50" },
        { label: "Draft Blogs", value: stats?.draftBlogs, icon: FiEdit2, color: "text-amber-600 bg-amber-50" },
        { label: "Total Likes", value: stats?.totallike, icon: FiHeart, color: "text-rose-600 bg-rose-50" },
        { label: "Total Comments", value: stats?.totalComment, icon: FiMessageSquare, color: "text-indigo-600 bg-indigo-50" },
        { label: "Total Bookmarks", value: stats?.totalBookmark, icon: FiBookmark, color: "text-purple-600 bg-purple-50" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cardsConfig.map((card, idx) => {
                const Icon = card.icon;

                if (loading) {
                    return (
                        <div key={idx} className="p-5 bg-white border border-slate-100 rounded-2xl flex justify-between items-center animate-pulse">
                            <div className="space-y-3 flex-1">
                                <div className="h-3.5 bg-slate-100 rounded w-1/2"></div>
                                <div className="h-7 bg-slate-200 rounded w-1/3"></div>
                            </div>
                            <div className="w-11 h-11 bg-slate-100 rounded-xl"></div>
                        </div>
                    );
                }

                return (
                    <div
                        key={idx}
                        className="p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm flex justify-between items-center transition-all duration-200 hover:shadow-md hover:border-slate-200"
                    >
                        <div className="text-left">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                {card.label}
                            </h3>
                            <p className="text-3xl font-extrabold text-slate-800 tracking-tight">
                                {card.value ?? 0}
                            </p>
                        </div>

                        <div className={`p-3 rounded-xl ${card.color} flex items-center justify-center shrink-0`}>
                            <Icon size={20} strokeWidth={2.5} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsCards;