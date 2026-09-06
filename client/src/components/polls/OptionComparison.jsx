function OptionComparison({ options }) {
  return (
    <div>
      <h2>Option Comparison</h2>

      {options.map((option, index) => (
        <div key={index}>
          <h3>{option.name}</h3>
          <p>Votes: {option.votes}</p>
        </div>
      ))}
    </div>
  );
}

export default OptionComparison;