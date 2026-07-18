export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4 tracking-tight">
          Journey Care Mother
        </h1>
        <p className="text-gray-500 mb-6 leading-relaxed">
          The React application has been successfully configured with Tailwind CSS v4, App.jsx, and main.jsx linked.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold">
          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping"></span>
          Ready for development
        </div>
      </div>
    </div>
  )
}
