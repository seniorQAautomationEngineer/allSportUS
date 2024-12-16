interface AthleteProfileCardProps {
  formData: any;
  onEdit: () => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function AthleteProfileCard({
  formData,
  onEdit,
  onSearch,
  isLoading,
}: AthleteProfileCardProps) {
  const renderSportStatistic = () => {
    if (!formData.sportStatistic) {
      return <p>No sport statistics available.</p>;
    }

    return (
      <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Statistic:</h3>
      {Object.entries(formData.sportStatistic).map(([key, value]) => (
        <div key={key} className="bg-gray-50 p-2 rounded mb-2">
          <p className="text-sm font-semibold">{key}:</p>
          <p className="text-sm">
            {typeof value === 'string' || typeof value === 'number'
              ? value
              : Array.isArray(value)
              ? value.join(', ') // Convert array to a comma-separated string
              : value !== null && value !== undefined
              ? JSON.stringify(value) // Render objects as JSON
              : 'N/A'} {/* Default fallback for null/undefined */}
          </p>
        </div>
      ))}
    </div>
    
    );
  };

  const renderSportData = () => {
    return (
      <div className="mt-4">
        <div className="bg-gray-50 p-2 rounded mb-2">
          <p className="text-sm font-semibold">Sport:</p>
          <p className="text-sm">{formData.sport || "N/A"}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded mb-2">
          <p className="text-sm font-semibold">Gender:</p>
          <p className="text-sm">{formData.gender || "N/A"}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-sm rounded-lg p-4">
      <button
        onClick={onEdit}
        className="text-sm text-blue-500 underline hover:text-blue-600"
      >
        Edit Profile
      </button>
      {renderSportData()}
      {renderSportStatistic()}
      <button
        onClick={onSearch}
        className={`w-full mt-4 py-2 rounded ${
          isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search NCAA Programs"}
      </button>
    </div>
  );
}
