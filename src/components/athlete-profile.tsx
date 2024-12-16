interface AthleteProfileCardProps {
  name: string;
  sport: string;
  gender: string;
  additionalData: Record<string, any>;
  sportData?: any;
  onEdit: () => void;
  onSearch?: () => Promise<void>;
  isLoading?: boolean;
}

export const AthleteProfileCard: React.FC<AthleteProfileCardProps> = ({
  name,
  sport,
  gender,
  additionalData,
  sportData,
  onEdit,
  onSearch,
  isLoading,
}) => {
  return (
    <div className="p-4 bg-white shadow rounded max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">
        {name} | {sport} | {gender}
      </h2>
      {sportData && (
        <div>
          <h3 className="font-medium">Sport Data:</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(sportData, null, 2)}</pre>
        </div>
      )}
      <button
        onClick={onEdit}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Edit Profile
      </button>
      {onSearch && (
        <button
          onClick={onSearch}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Search
        </button>
      )}
      {isLoading && <p className="mt-2 text-gray-600">Loading...</p>}
      <div className="mt-4">
        <h3 className="font-medium">Additional Data:</h3>
        <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(additionalData, null, 2)}</pre>
      </div>
    </div>
  );
};
