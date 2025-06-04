import React, { useEffect,use, useMemo,useState} from 'react';
import { useAuthStore } from "../store/authStore";
import { Bookmark, PencilIcon, Trash, TrashIcon, Plus, Search,Filter,Trash2,Edit} from "lucide-react";

import { useProblemStore } from '../store/useProblemStore';
const ProblemTable = ({problems}) => {
    const { authUser } = useAuthStore();
    const [difficulty,setDifficulty] = useState("All")
    const [selectedTag,setSelectedTag] = useState("All")
    const [search,setSearch] = useState("")
    const [currentPage,setCurrentPage] = useState(1)

    const allTags = useMemo(()=>{
        if(!Array.isArray(problems)) return[]

        console.log("problems",problems)

        const tagSet = new Set();

        problems.forEach((problem) => {
            problem.tags.forEach((tag) => {
                tagSet.add(tag);
            });
        });

            return Array.from(tagSet);
        })

    const filteredProblem = useMemo(() =>{
      console.log("asdada",problems)
      return (problems)
                .filter((problem)=>search === "" || problem.title.toLowerCase().includes(search))
                .filter((problem)=>selectedTag === "All" || problem.tags.includes(selectedTag))
                .filter((problem)=>difficulty === "All" || problem.difficulty === difficulty)
    },[problems,search,selectedTag,difficulty])

    console.log("filtered problem",filteredProblem)


    const itemPerpage = 5;

    const paginatedProblems = useMemo(() => {
        return filteredProblem.slice((currentPage - 1) * itemPerpage, currentPage * itemPerpage);
    })
    const difficulties = ["EASY", "MEDIUM", "HARD"];
    return (
    <div className="container mx-auto p-4 mt-15">
            {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Problems</h2>
          <p className="text-slate-600">Manage and organize your coding challenges</p>
        </div>
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-5 h-5" />
          Create Playlist
        </button>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-8 ">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select
                className="pl-10 pr-8 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 min-w-[160px]"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="ALL">All Difficulties</option>
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            
            <select
              className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 min-w-[140px]"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="ALL">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

       {/* Enhanced Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProblems.length > 0 ? (
                paginatedProblems.map((problem, index) => {
                  const isSolved = problem.solvedProblem.some(
                    (user) => user.userId === authUser?.id
                  );
                  return (
                    <tr key={problem.id} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isSolved}
                            readOnly
                            className="w-5 h-5 text-green-600 rounded focus:ring-green-500 border-slate-300"
                          />
                          <span className={`ml-3 w-3 h-3 rounded-full ${isSolved ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-semibold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors">
                              {problem.title}
                            </div>
                            <div className="text-xs text-slate-500">Problem #{problem.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white text-xs font-bold">
                              {problem.company|| "dsaBuddy"}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-slate-700">{problem.company??"dsaBuddy"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {(problem.tags || []).slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                            >
                              {tag}
                            </span>
                          ))}
                          {problem.tags && problem.tags.length > 3 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                              +{problem.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            problem.difficulty === "EASY"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : problem.difficulty === "MEDIUM"
                              ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {authUser?.role === "ADMIN" && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleDelete(problem.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button 
                                disabled 
                                className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors duration-150"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                          <button
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-150"
                            onClick={() => handleAddToPlaylist(problem.id)}
                          >
                            <Bookmark className="w-4 h-4" />
                            <span className="hidden sm:inline">Save</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-lg font-medium">No problems found</p>
                      <p className="text-sm">Try adjusting your search filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
}

export default ProblemTable;
