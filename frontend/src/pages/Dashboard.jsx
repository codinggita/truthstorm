import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PAGE_SIZE = 5;

const SCORE_COLOR = (score) => {
    if (score >= 70) return 'text-green-600 dark:text-green-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
};

const SCORE_BG = (score) => {
    if (score >= 70) return 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800';
    if (score >= 40) return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
    return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
};

const SAMPLE_DATA = [
    { _id: '1', caption: 'SHOCKING: Scientists discover miracle cure that big pharma doesn\'t want you to know!!!', status: 'completed', credibilityScore: 15, verdict: 'Likely False', report: '⚠️ Caption contains 3 sensational keyword(s).\n⚠️ Excessive capitalization detected.\nℹ️ No source URL was provided.', createdAt: new Date().toISOString() },
    { _id: '2', caption: 'WHO releases new guidelines on healthy eating habits for 2025.', sourceUrl: 'https://www.who.int/news/2025', status: 'completed', credibilityScore: 85, verdict: 'Likely True', report: '✅ Caption language appears neutral.\n✅ Source URL points to a credible organization.\n✅ Sufficient text provided for analysis.', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: '3', caption: 'Breaking: New study suggests coffee may extend lifespan.', sourceUrl: 'https://www.reuters.com/health', status: 'completed', credibilityScore: 72, verdict: 'Likely True', report: '⚠️ Caption contains 1 sensational keyword.\n✅ Source URL points to Reuters, a credible organization.', createdAt: new Date(Date.now() - 172800000).toISOString() },
    { _id: '4', caption: 'SHARE BEFORE DELETED: Proof the moon landing was faked!', status: 'completed', credibilityScore: 5, verdict: 'Likely False', report: '⚠️ Caption contains 4 sensational keyword(s).\n⚠️ Excessive capitalization detected.\nℹ️ No source URL was provided.', createdAt: new Date(Date.now() - 259200000).toISOString() },
    { _id: '5', caption: 'Scientists are studying long-term effects of social media on mental health.', sourceUrl: 'https://apnews.com/article/research', status: 'completed', credibilityScore: 65, verdict: 'Uncertain', report: '✅ Caption language appears neutral.\n✅ Source is AP News, a credible organization.', createdAt: new Date(Date.now() - 345600000).toISOString() },
    { _id: '6', caption: 'They don\'t want you to know: Secret vaccine ingredients exposed!', status: 'completed', credibilityScore: 8, verdict: 'Likely False', report: '⚠️ Caption contains 3 sensational keyword(s).\nℹ️ No source URL was provided.', createdAt: new Date(Date.now() - 432000000).toISOString() },
];

const Dashboard = () => {
    const { user } = useAuth();
    const [allInvestigations, setAllInvestigations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [filterVerdict, setFilterVerdict] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setTimeout(() => {
            setAllInvestigations(SAMPLE_DATA);
            setLoading(false);
        }, 600);
    }, []);

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
            setCurrentPage(1);
        }, 400);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Reset page when filter changes
    useEffect(() => { setCurrentPage(1); }, [filterVerdict]);

    const handleDelete = (id) => {
        setAllInvestigations(prev => prev.filter(inv => inv._id !== id));
    };

    // Filter + Search
    const filtered = allInvestigations.filter((inv) => {
        const matchSearch = debouncedQuery === '' || (inv.caption || '').toLowerCase().includes(debouncedQuery.toLowerCase());
        const matchFilter = filterVerdict === 'All' || inv.verdict === filterVerdict;
        return matchSearch && matchFilter;
    });

    // Pagination
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <div className="w-full max-w-4xl mx-auto mt-10 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Investigation Dashboard
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Welcome back, <span className="font-semibold text-blue-600 dark:text-blue-400">{user?.name}</span>!
                    </p>
                </div>
                <Link
                    to="/investigate"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2"
                >
                    🔍 New Investigation
                </Link>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search investigations..."
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <select
                    value={filterVerdict}
                    onChange={(e) => setFilterVerdict(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                    <option value="All">All Verdicts</option>
                    <option value="Likely True">Likely True</option>
                    <option value="Uncertain">Uncertain</option>
                    <option value="Likely False">Likely False</option>
                </select>
            </div>

            {/* Content */}
            {loading ? (
                <div className="text-center py-20 text-gray-400 dark:text-gray-500">
                    <p className="text-lg">Loading your investigations...</p>
                </div>
            ) : paginated.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <p className="text-5xl mb-4">🔎</p>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No results found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {paginated.map((inv) => (
                        <div key={inv._id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-800 dark:text-gray-200 font-medium line-clamp-2 mb-2">
                                        {inv.caption || inv.sourceUrl || 'No caption provided'}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                        {new Date(inv.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                                {inv.status === 'completed' && (
                                    <div className={`flex-shrink-0 text-center px-4 py-2 rounded-xl border ${SCORE_BG(inv.credibilityScore)}`}>
                                        <div className={`text-2xl font-black ${SCORE_COLOR(inv.credibilityScore)}`}>{inv.credibilityScore}</div>
                                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">/ 100</div>
                                    </div>
                                )}
                            </div>
                            {inv.status === 'completed' && (
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${SCORE_BG(inv.credibilityScore)} ${SCORE_COLOR(inv.credibilityScore)}`}>
                                            {inv.verdict}
                                        </span>
                                        <button onClick={() => handleDelete(inv._id)} className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors font-medium">
                                            Delete
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-pre-line leading-relaxed">{inv.report}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        ← Previous
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400 px-3">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        Next →
                    </button>
                </div>
            )}

            {/* Results count */}
            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                Showing {paginated.length} of {filtered.length} investigations
            </p>
        </div>
    );
};

export default Dashboard;
