import { Save, X } from "lucide-react"

const AddContactForm = () => {
  // Array of all US states for dropdown
  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
    "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
    "District of Columbia"
  ];

  return (
    <div className="w-full mx-auto p-6 dark:bg-gray-900">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-light text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">New Contact</h1>

        <form className="w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-8 border border-gray-100 dark:border-gray-700">
          {/* First row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <input
                type="text"
                placeholder="Enter title (e.g. Manager)"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Third row: Country, State, City */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] appearance-none cursor-pointer text-gray-800 dark:text-gray-100"
                defaultValue="usa"
              >
                <option value="usa">United States of America</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="australia">Australia</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] appearance-none cursor-pointer text-gray-800 dark:text-gray-100"
              >
                <option value="">Select a state</option>
                {usStates.map((state, index) => (
                  <option key={index} value={state.toLowerCase().replace(/\s/g, '-')}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
              <input
                type="text"
                placeholder="Enter your city"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Zip Code</label>
              <input
                type="text"
                placeholder="Enter your zip code"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Title</label>
              <input
                type="text"
                placeholder="Enter company title"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
              <input
                type="url"
                placeholder="Enter company website"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <X size={18} />
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#06AED7] text-white font-medium flex items-center gap-2 transition-all duration-300 hover:bg-[#0590b3] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:ring-offset-2 dark:bg-[#06AED7] dark:hover:bg-[#0590b3] dark:focus:ring-[#00c1f5]"
            >
              <Save size={18} />
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddContactForm