import React, { useState } from "react";



const HospitalAccountsPage = () => {
  const [accounts, setAccounts] = useState([]);

  const handleAddAccount = (newAccount) => {
    setAccounts([...accounts, { id: Date.now(), ...newAccount }]);
  };

  const handleDeleteAccount = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  return (
    <div>
      <h1>Hospital Accounts Management</h1>
      <AccountList accounts={accounts} onDelete={handleDeleteAccount} />
      <AddAccountForm onAdd={handleAddAccount} />
    </div>
  );
};

export default HospitalAccountsPage;


const AddAccountForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role) return;
    onAdd({ name, role });
    setName("");
    setRole("");
  };

  return (
    <div>
      <h2>Add New Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};


const AccountList = ({ accounts, onDelete }) => {
  return (
    <div>
      <h2>Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            {account.name} - {account.role}
            <button onClick={() => onDelete(account.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};