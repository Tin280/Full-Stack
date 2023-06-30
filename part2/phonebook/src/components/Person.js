const Person = ({ name, number, handleRemovePerson }) => {
  return (
    <div key={name}>
      {name} {number} <button onClick={handleRemovePerson}>delete</button>
    </div>
  );
};
export default Person;
