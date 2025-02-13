export default function SubmitButton({ label = "Submit", onClick, loading = false }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`px-4 py-2 rounded transition font-semibold ${
        loading
          ? "bg-gray-600 text-gray-300 cursor-not-allowed" 
          : "bg-black text-white hover:bg-gray-800"     
      }`}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
