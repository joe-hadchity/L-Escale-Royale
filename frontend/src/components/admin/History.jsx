import React from 'react';

const History = () => {
    const history = [
        { id: 1, action: 'Ajouté un article', date: '2024-09-01' },
        { id: 2, action: 'Supprimé un utilisateur', date: '2024-09-02' },
    ];

    return (
        <div>
            <h1>Historique</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Action</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map(entry => (
                        <tr key={entry.id}>
                            <td>{entry.id}</td>
                            <td>{entry.action}</td>
                            <td>{entry.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default History;
