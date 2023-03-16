const Filter = ({ query, handlechange }) =>(
<p>
filter shown with<input value={query} onChange={handlechange} />
</p>
)

export default Filter