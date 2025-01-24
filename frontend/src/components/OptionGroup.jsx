const OptionGroup = ({ header, options, selected, onChange, name }) => {
  return (
    <div className="mb-8">
      {header && (
        <h3 className="text-xl font-bold mb-4 text-center text-[#4CAF50]">
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
                className="flex flex-1 items-center justify-between rounded-xl border-2 border-[#E0E0E0] bg-[#FFFFFF] p-4 hover:bg-[#F5F5F5] hover:text-[#FFA500] peer-checked:border-[#FFA500] peer-checked:bg-[#FFF8E1] cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-3">
                  {Icon && <Icon className="w-5 h-5 text-[#4CAF50]" />}
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
