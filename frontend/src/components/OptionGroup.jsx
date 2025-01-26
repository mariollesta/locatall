const OptionGroup = ({ header, options, selected, onChange, name }) => {
  return (
    <div className="mb-8">
      {header && (
        <h3 className="text-xl font-bold mb-4 text-center text-[#3f2d85]">
          {header}
        </h3>
      )}
      <div className="flex flex-col space-y-2">
        {options.map((option) => {
          const Icon = option.icon; 
          return (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={selected === option.value}
                onChange={() => onChange(option.value)}
                className="hidden peer"
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className="flex flex-1 items-center justify-between p-4 bg-white bg-opacity-10 border border-white border-opacity-30 shadow-md rounded-lg hover:bg-[#dbdbf9] hover:text-[#3f2d85] peer-checked:border-white peer-checked:bg-[#3f2d85] peer-checked:text-white cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-3">
                  {Icon && (
                    <Icon 
                      className={`w-5 h-5 ${
                        selected === option.value ? 'text-[#E6E6FA]' : 'text-[#3f2d85]'
                      } transition-all`}
                    />
                  )}
                  <span>{option.label}</span>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionGroup;
