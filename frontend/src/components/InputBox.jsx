export const InputBox = ({label, type, placeholder, value, onChange}) => {
    return <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}
         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        />
        </div>
        }