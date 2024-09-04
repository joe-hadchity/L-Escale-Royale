import React from 'react';

const UserManagement = () => {
    const users = [
        { id: 1, name: 'Jean Dupont', role: 'Staff' },
        { id: 2, name: 'Marie Durant', role: 'Staff' },
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Gestion des Utilisateurs</h1>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Rôle</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
