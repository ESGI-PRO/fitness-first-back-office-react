import React, { useState, useEffect } from 'react'; 

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';     
import { Toolbar } from 'primereact/toolbar';

import { usersService } from '../../services';

function ListUsers() {
    const [users, setUsers] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState(null);

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounde disabled:bg-red-300"
                    disabled={!selectedUsers}
                    onClick={() => deleteUser(selectedUsers.id)}
                >
                    <span className="pi pi-plus"></span> Ajouter
                </button>
            </div>
        );
    };

    useEffect(() => {
        usersService.getAll().then(x => setUsers(x.data));
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        usersService.remove(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    console.log(selectedUsers);

    return (
        <div className="mt-10 px-6 py-4">
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
            <DataTable 
                value={users} 
                paginator 
                rows={5} 
                rowsPerPageOptions={[5, 10, 25, 50]} 
                tableStyle={{ minWidth: '50rem' }}
                selectionMode="single" selection={selectedUsers} onSelectionChange={e => setSelectedUsers(e.value)}
            >
                <Column field="email" sortable header="Email"></Column>
                <Column field="userName" sortable header="Nom d'utilisateur"></Column>
                <Column field="isTrainer" sortable header="Formateur"></Column>
                <Column field="mobileNumber" sortable header="Téléphone"></Column>
            </DataTable>
        </div>
    );
}

export { ListUsers };