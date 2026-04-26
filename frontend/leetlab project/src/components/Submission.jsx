import React from 'react';
import { CheckCircle2, XCircle, Clock, MemoryStick as Memory } from 'lucide-react';

const SubmissionResults = ({ submission }) => {
  // Parse stringified arrays
  const memoryArr = JSON.parse(submission.memory || '[]');
  const timeArr = JSON.parse(submission.time || '[]');

  console.log(submission.testCases)

  // Calculate averages
  const avgMemory = memoryArr
    .map(m => parseFloat(m)) // remove ' KB' using parseFloat
    .reduce((a, b) => a + b, 0) / memoryArr.length;

  const avgTime = timeArr
    .map(t => parseFloat(t)) // remove ' s' using parseFloat
    .reduce((a, b) => a + b, 0) / timeArr.length;

  const passedTests = submission.testCases?.filter((tc) => tc.passed).length;
  const totalTests = submission.testCases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
   <div className="space-y-8">
  {/* Overall Status Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Status Card */}
    <div className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-600">Status</h3>
          <div className={`w-3 h-3 rounded-full ${
            submission.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
        </div>
        <div className={`text-2xl font-bold ${
          submission.status === 'Accepted' 
            ? 'text-green-600 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent' 
            : 'text-red-600 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent'
        }`}>
          {submission.status}
        </div>
      </div>
    </div>

    {/* Success Rate Card */}
    <div className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-600">Success Rate</h3>
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {successRate.toFixed(1)}%
        </div>
        {/* Progress Bar */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${successRate}%` }}
          ></div>
        </div>
      </div>
    </div>

    {/* Runtime Card */}
    <div className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Avg. Runtime
          </h3>
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
        </div>
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {avgTime.toFixed(3)}s
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {avgTime < 1 ? 'Excellent' : avgTime < 2 ? 'Good' : 'Average'}
        </div>
      </div>
    </div>

    {/* Memory Card */}
    <div className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Memory className="w-4 h-4" />
            Avg. Memory
          </h3>
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <Memory className="w-4 h-4 text-amber-600" />
          </div>
        </div>
        <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          {avgMemory.toFixed(0)} KB
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {avgMemory < 1000 ? 'Efficient' : avgMemory < 5000 ? 'Good' : 'High'}
        </div>
      </div>
    </div>
  </div>

  {/* Test Cases Results */}
  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
    <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Test Cases Results</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{submission.testCases.filter(tc => tc.passed).length} Passed</span>
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>{submission.testCases.filter(tc => !tc.passed).length} Failed</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Expected Output</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Your Output</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Memory</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {submission.testCases.map((testCase, index) => (
              <tr key={testCase.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  {testCase.passed ? (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-green-700">Passed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <XCircle className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-sm font-medium text-red-700">Failed</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm font-mono text-gray-800 max-w-xs overflow-hidden">
                    {testCase.expected}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`rounded-lg px-3 py-2 text-sm font-mono max-w-xs overflow-hidden ${
                    testCase.passed 
                      ? 'bg-green-50 text-green-800' 
                      : 'bg-red-50 text-red-800'
                  }`}>
                    {testCase.stdout || 'null'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-8 bg-amber-200 rounded-full relative overflow-hidden">
                      <div 
                        className="absolute bottom-0 w-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ height: `${Math.min((testCase.memory / 1000) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{testCase.memory}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-8 bg-purple-200 rounded-full relative overflow-hidden">
                      <div 
                        className="absolute bottom-0 w-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{ height: `${Math.min(parseFloat(testCase.time) * 50, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{testCase.time}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  );
};

export default SubmissionResults;