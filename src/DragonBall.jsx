import React, { useEffect, useState } from "react";
import axios from "axios";

const DragonBall = () => {
  const [dragon, setDragon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://dragonball-api.com/api/characters?limit=58";

  const fetchDragon = async () => {
    try {
      const response = await axios.get(API);
      setDragon(response.data.items);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDragon();
  }, []);

  const searchData = dragon.filter((curDragon) =>
    curDragon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl font-semibold">
        Loading Dragon Ball characters...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-xl">
        {error.message}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 py-6 shadow-lg overflow-hidden">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <img
            src="/Titile.webp"
            alt="Dragon Ball"
            className="h-16 w-auto transform scale-400"
          />
        </div>
      </header>

      {/* Centered Search Bar */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search character..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block mx-auto w-72 md:w-96 px-4 py-2 m-4 rounded-lg text-black bg-white border-t-4 border-gray-800 border-l-0 border-r-0 border-b-0 focus:outline-none focus:border-orange-500"
        />
      </div>
      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 p-4 sm:p-6">
        {searchData.map((char) => (
          <div
            key={char.id}
            className="
              bg-white rounded-xl shadow-md overflow-hidden
              transform transition duration-300 ease-in-out
              hover:-translate-y-2 hover:shadow-xl
              active:scale-95
              group cursor-pointer
            "
          >
            {/* Image */}
            <div className="bg-gray-100 p-4 overflow-hidden">
              <img
                src={char.image}
                alt={char.name}
                className="
                  h-40 sm:h-44 md:h-52
                  mx-auto object-contain
                  transition-transform duration-300 ease-in-out
                  group-hover:scale-110
                  group-active:scale-110
                "
              />
            </div>

            {/* Info */}
            {/* Info */}
            <div className="p-3 sm:p-4 bg-gradient-to-t from-orange-50 to-yellow-100 rounded-b-xl shadow-inner space-y-1 text-sm">
              <h3 className="text-lg font-bold text-center text-orange-600 mb-2">
                {char.name}
              </h3>

              <p className="flex justify-between">
                <span className="font-semibold text-gray-700">Gender:</span>
                <span className="text-yellow-500 font-semibold text-base sm:text-lg">
                  {char.gender}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="font-semibold text-gray-700">Race:</span>
                <span className="text-yellow-500 font-semibold text-base sm:text-lg">
                  {char.race}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="font-semibold text-gray-700">Base Ki:</span>
                <span className="text-yellow-500 font-semibold text-base sm:text-lg">
                  {char.ki}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="font-semibold text-gray-700">Total Ki:</span>
                <span className="text-yellow-500 font-semibold text-base sm:text-lg">
                  {char.maxKi}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  Affiliation:
                </span>
                <span className="text-yellow-500 font-semibold text-base sm:text-lg">
                  {char.affiliation}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DragonBall;
