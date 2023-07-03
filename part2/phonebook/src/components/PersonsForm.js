const PersonsForm = ({
  newNumber,
  newName,
  handlechangeName,
  handlechangeNumber,
  handleAddPerson,
}) => (
  <form onSubmit={handleAddPerson}>
    <div>
      name: <input value={newName} onChange={handlechangeName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handlechangeNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonsForm;
