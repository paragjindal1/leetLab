import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useExecutionStore } from "../store/useExecutingStore";
import {getLanguageId} from "../lib/lang"
import Submission from "../components/Submission"
import { UseSubmissionStore } from "../store/useSubmissionStore";

import {
    CheckCircle,
  Loader,
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
} from "lucide-react";

import { useProblemStore } from "../store/useProblemStore";
import SubmissionsList from "../components/SubmissionsList";

const ProblemPage = () => {
  const { submissionCount ,getSubmissionCount,submission:submissions,isLoading:isSubmissionsLoading,getSubmissionByProblem} = UseSubmissionStore();
    const { executeCode,isExecuting,submission,setSubmissionNull } = useExecutionStore();
  const { id } = useParams();
  const { problemById, isproblemByIdLoading, getProblemById ,deleteProblemById} =
    useProblemStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);
  

  useEffect(() => {
    setSubmissionNull();
    getProblemById(id);
  }, [id]);

  useEffect(() => {
    if(problemById){
    console.log("problem by id", problemById);
    console.log(selectedLanguage.toUpperCase());
    setCode(problemById.codeSnippets?.[selectedLanguage.toUpperCase()] || "");
    getSubmissionCount(problemById.id)

    setTestCases(
      problemById.testcases?.map((tc) => ({
        input: tc.input,
        output: tc.output,
      }))
    );
    }
  }, [selectedLanguage, problemById]);

  useEffect(()=>{
    if(activeTab === "submissions"){
      getSubmissionByProblem(id);
    }
  },[activeTab])


  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    if (problemById) {
      setSelectedLanguage(lang);
      setCode(problemById.codeSnippets?.[lang.toUpperCase()] || "");
    }
  };

  if (!problemById) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const handleRunCode = (e) => {
    e.preventDefault();

    
    try {
        const language_id = getLanguageId(selectedLanguage);
        executeCode(code, language_id, id);
    } catch (error) {
        console.log(error)
        
    }
    
  };





  const renderTabContent = () => {
  switch (activeTab) {
    case "description":
      return (
        <div className="prose max-w-none">
          <p className="text-lg mb-6">{problemById.description}</p>

          {problemById.examples && (
            <>
              <h3 className="text-xl font-bold mb-4">Examples:</h3>
              {Object.entries(problemById.examples).map(([lang, example], idx) => (
                <div
                  key={lang}
                  className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
                >
                  <div className="mb-4">
                    <div className="text-indigo-300 mb-2 text-base font-semibold">
                      Input:
                    </div>
                    <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                      {example.input}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="text-indigo-300 mb-2 text-base font-semibold">
                      Output:
                    </div>
                    <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                      {example.output}
                    </span>
                  </div>
                  {example.explanation && (
                    <div>
                      <div className="text-emerald-300 mb-2 text-base font-semibold">
                        Explanation:
                      </div>
                      <p className="text-base-content/70 text-lg font-sem">
                        {example.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {problemById.constraints && (
            <>
              <h3 className="text-xl font-bold mb-4">Constraints:</h3>
              <div className="bg-base-200 p-6 rounded-xl mb-6">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problemById.constraints}
                </span>
              </div>
            </>
          )}
        </div>
      );
    case "submissions":
      return (
        <SubmissionsList
          submissions={submissions}
          isLoading={isSubmissionsLoading}
        />
      );
    case "discussion":
      return (
        <div className="p-4 text-center text-base-content/70">
          No discussions yet
        </div>
      );
    case "hints":
      return (
        
        <div className="p-4">
          {problemById?.hints ? (
            <div className="bg-base-200 p-6 rounded-xl">
              <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                {problemById.hints}
              </span>
            </div>
          ) : (
            <div className="text-center text-base-content/70">
              No hints available
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
};

  return (
    
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
  <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors">
            <Home className="w-5 h-5" />
            <ChevronRight className="w-4 h-4" />
          </Link>
          <div className="border-l border-gray-300 pl-4">
            <h1 className="text-2xl font-bold text-gray-900">{problemById.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  Updated{" "}
                  {new Date(problemById.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{submissionCount} Submissions</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">95% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            className={`p-2 rounded-lg transition-all ${
              isBookmarked 
                ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          
          <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          
          <select
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-w-[140px]"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(problemById.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  </nav>

  <div className="max-w-7xl mx-auto p-6">
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Problem Description Panel */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex">
            {[
              { id: "description", icon: FileText, label: "Description" },
              { id: "submissions", icon: Code2, label: "Submissions" },
              { id: "discussion", icon: MessageSquare, label: "Discussion" },
              { id: "hints", icon: Lightbulb, label: "Hints" }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-600 bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-8 min-h-[500px] max-h-[600px] overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>

      {/* Code Editor Panel */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-800">Code Editor</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>{selectedLanguage}</span>
            </div>
          </div>
        </div>

        <div className="h-[500px] relative">
          <Editor
            height="100%"
            language={selectedLanguage.toLowerCase()}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              padding: { top: 16, bottom: 16 },
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}
          />
        </div>

        <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              className={`flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isExecuting ? "opacity-75 cursor-not-allowed" : ""
              }`}
              onClick={handleRunCode}
              disabled={isExecuting}
            >
              {isExecuting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Play className="w-4 h-4" />
              )}
              {isExecuting ? "Running..." : "Run Code"}
            </button>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium transition-all hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              <CheckCircle className="w-4 h-4" />
              Submit Solution
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Test Cases / Results Panel */}
    <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {submission ? "Execution Results" : "Test Cases"}
          </h3>
          {!submission && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>{testcases.length} test cases</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-8">
        {submission ? (
          <Submission submission={submission} />
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                    Input
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                    Expected Output
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {testcases.map((testCase, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-800 bg-gray-50">
                      {testCase.input}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-800">
                      {testCase.output}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  );
};

export default ProblemPage;
