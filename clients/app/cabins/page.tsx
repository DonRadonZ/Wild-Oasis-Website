import Counter from "../components/Counter";




export default async function Page() {

  const res = await fetch('https://jsonplaceholder.typicode.com/users');

  const data = await res.json();

  

  return (
    <div>
    <h1>Cabins page</h1>
    <ul>{data.map((user: {id: number, name: string}) => <li key={user.id}>
      <li>{user.name}</li>
    </li>)}</ul>
    <Counter/>
    </div>
  )
}
