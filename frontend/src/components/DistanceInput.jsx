const DistanceInput = ({ value, label, selected, onChange }) => {
    return (
      <div className="flex items-center">
        <input
          type="radio"
          id={`distance-${value}`}
          name="distance"
          value={value}
          checked={selected === value}
          onChange={() => onChange(value)}
          className="hidden peer"
        />
        <label
          htmlFor={`distance-${value}`}
          className="flex flex-1 items-center justify-between rounded-xl border-2 border-[#E0E0E0] bg-[#FFFFFF] p-4 hover:bg-[#F5F5F5] hover:text-[#FFA500] peer-checked:border-[#FFA500] peer-checked:bg-[#FFF8E1] cursor-pointer transition-all"
        >
          {label}
        </label>
      </div>
    );
  };
  
export default DistanceInput;
  