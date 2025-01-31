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
          const isSelected = selected === option.value;

          return (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="hidden"
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className={`flex flex-1 items-center justify-between p-4 border shadow-md rounded-lg cursor-pointer transition-all
                  ${
                    isSelected
                      ? "border-white bg-[#3f2d85] text-white"
                      : "bg-white bg-opacity-10 border-white border-opacity-30 hover:bg-[#dbdbf9] hover:text-[#3f2d85]"
                  }`}
              >
                <div className="flex items-center space-x-3">
                  {Icon && (
                    <Icon
                      className={`w-5 h-5 transition-all ${
                        isSelected ? "text-[#E6E6FA]" : "text-[#3f2d85]"
                      }`}
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
