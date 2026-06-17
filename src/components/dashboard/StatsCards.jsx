const StatsCards = ({ loading, error, cardsConfig = [] }) => {
    if (error) {
        return (
            <div className="bg-violet-50 border border-violet-100 p-4 rounded-xl text-sm font-medium text-violet-600 text-center mx-1 sm:mx-0">
                Failed to load dashboard metrics: {error}
            </div>
        );
    }

    return (
        // Adjusted grid: 1 col (mobile) -> 2 cols (tablets) -> 3 cols (desktop views)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
            {cardsConfig.map((card, idx) => {
                const Icon = card.icon;

                if (loading) {
                    return (
                        <div key={idx} className="p-4 sm:p-5 bg-white border border-slate-100 rounded-2xl flex justify-between items-center animate-pulse shadow-sm">
                            <div className="space-y-3 flex-1">
                                <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                                <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                            </div>
                            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-slate-100 rounded-xl shrink-0"></div>
                        </div>
                    );
                }

                return (
                    <div
                        key={idx}
                        className="p-4 sm:p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm flex justify-between items-center transition-all duration-200 hover:shadow-md hover:border-slate-200 w-full"
                    >
                        {/* Overflow hidden keeps layouts clean even if metric integers scale unexpectedly high */}
                        <div className="text-left min-w-0 pr-2">
                            <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">
                                {card.label}
                            </h3>
                            <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight truncate">
                                {card.value ?? 0}
                            </p>
                        </div>

                        {/* Decreased icon-box size slightly on mobile viewport rows to make text space wider */}
                        <div className={`p-2.5 sm:p-3 rounded-xl ${card.color} flex items-center justify-center shrink-0`}>
                            <Icon className="w-5 h-5 sm:w-5 sm:h-5" strokeWidth={2.5} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsCards;