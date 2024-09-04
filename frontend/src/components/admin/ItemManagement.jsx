import React, { useState } from 'react';
import { Modal, Button, Form, Pagination } from 'react-bootstrap';

const ItemManagement = () => {
    // Dummy data for categories and items
    const categories = [
        { id: 1, name: 'Salades' },
        { id: 2, name: 'Pizzas' },
        { id: 3, name: 'Boissons' },
        { id: 4, name: 'Desserts' }
    ];

    const allItems = [
        { id: 1, name: 'Pizza Margherita', category: 'Pizzas' },
        { id: 2, name: 'Coca Cola', category: 'Boissons' },
        { id: 3, name: 'Salade César', category: 'Salades' },
        { id: 4, name: 'Sprite', category: 'Boissons' },
        { id: 5, name: 'Cheesecake', category: 'Desserts' },
        { id: 6, name: 'Pizza Pepperoni', category: 'Pizzas' },
        { id: 7, name: 'Mousse au Chocolat', category: 'Desserts' },
        { id: 8, name: 'Eau Minérale', category: 'Boissons' }
    ];

    // State for managing the list of items, modal, and pagination
    const [items, setItems] = useState(allItems);
    const [filteredItems, setFilteredItems] = useState(allItems);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Ajouter un article');
    const [currentItem, setCurrentItem] = useState(null);
    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    
    // Pagination states
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the items to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // Handle modal opening for new or existing item
    const handleShowModal = (item = null) => {
        if (item) {
            setModalTitle('Mettre à jour l\'article');
            setCurrentItem(item);
            setItemName(item.name);
            setItemCategory(item.category);
        } else {
            setModalTitle('Ajouter un article');
            setCurrentItem(null);
            setItemName('');
            setItemCategory('');
        }
        setShowModal(true);
    };

    // Handle adding or updating an item
    const handleSaveItem = () => {
        if (currentItem) {
            // Update item
            setItems(items.map(itm =>
                itm.id === currentItem.id ? { ...itm, name: itemName, category: itemCategory } : itm
            ));
        } else {
            // Add new item
            const newItem = {
                id: items.length + 1,
                name: itemName,
                category: itemCategory
            };
            setItems([...items, newItem]);
        }
        setShowModal(false);
        applyFilter(filterCategory);  // Reapply filter after adding/updating
    };

    // Handle deleting an item
    const handleDeleteItem = (id) => {
        setItems(items.filter(itm => itm.id !== id));
        applyFilter(filterCategory);  // Reapply filter after deleting
    };

    // Handle category filtering
    const applyFilter = (category) => {
        setFilterCategory(category);
        if (category === '') {
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter(item => item.category === category));
        }
        setCurrentPage(1); // Reset to first page after filtering
    };

    // Handle pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="row mb-4">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h2>Gestion des Articles</h2>
                    <div>
                        <Form.Select
                            className="me-3"
                            value={filterCategory}
                            onChange={(e) => applyFilter(e.target.value)}
                            style={{ display: 'inline-block', width: 'auto' }}
                        >
                            <option value="">Filtrer par catégorie</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Button variant="success" onClick={() => handleShowModal()}>
                            Ajouter un article
                        </Button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <table className="table table-hover table-bordered" style={{ backgroundColor: '#f8f9fa' }}>
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Nom de l'Article</th>
                                <th>Catégorie</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <Button
                                            variant="info"
                                            className="me-2 text-white"
                                            onClick={() => handleShowModal(item)}
                                        >
                                            Mettre à jour
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteItem(item.id)}
                                        >
                                            Supprimer
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <Pagination className="justify-content-center">
                        {[...Array(Math.ceil(filteredItems.length / itemsPerPage)).keys()].map((page) => (
                            <Pagination.Item
                                key={page + 1}
                                active={page + 1 === currentPage}
                                onClick={() => handlePageChange(page + 1)}
                            >
                                {page + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>

            {/* Modal for Add/Update Item */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formItemName">
                            <Form.Label>Nom de l'Article</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrer le nom de l'article"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formItemCategory">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Select
                                value={itemCategory}
                                onChange={(e) => setItemCategory(e.target.value)}
                            >
                                <option value="">Sélectionner une catégorie</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleSaveItem}>
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ItemManagement;
