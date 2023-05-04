import { httpBatchLink } from '@trpc/client';
import { createTRPCProxyClient } from '@trpc/client';
import { AppRouter } from "../../../back/src/server";
import './App.css';
import {Form} from './Form';
import { Table } from './Table';
import { useState, useEffect } from 'react';

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({
    url: "http://localhost:3000/trpc"
  })]
});

function App() {
  const [users, setUsers] = useState<Array<any>>([]);

  useEffect(() => {
    async function getUsers() {
      const result = await client.getUsers.query();
      setUsers(result);
    }
    getUsers();
  }, []);

  async function addUser() {

    let emailInput = document.getElementById("email") as HTMLInputElement
    let nomeInput = document.getElementById("nome") as HTMLInputElement

    let email = emailInput.value
    let nome = nomeInput.value
    console.log(email,nome)
    if(!email || !nome){
      return null
    }
   
   await client.addUser.mutate({nome: nome, email: email});
  window.location.reload()
  }


  async function removeUser(id :number) {

  await client.removeUserById.mutate(id)
    
  window.location.reload()
  }

  return (
    <>
      <div style={{justifyItems: 'center', alignContent: 'space-between' , flexDirection: 'row' , display: 'flex' , flex: 1}}>
        <Form padding={30} addUser={addUser}/>
        <Table padding={30} users={users} removeUser={removeUser}/>
      </div>
    </>
  );
}

export default App;