import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CategoryManagement = () => {
    // Dummy data for categories
    const [categories, setCategories] = useState([
        { id: 1, name: 'Salades' },
        { id: 2, name: 'Pizzas' },
        { id: 3, name: 'Boissons' },
        { id: 4, name: 'Desserts' }
    ]);

    // State for managing the form modal
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Ajouter une catégorie');
    const [currentCategory, setCurrentCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    // Handle modal opening for new or existing category
    const handleShowModal = (category = null) => {
        if (category) {
            setModalTitle('Mettre à jour la catégorie');
            setCurrentCategory(category);
            setCategoryName(category.name);
        } else {
            setModalTitle('Ajouter une catégorie');
            setCurrentCategory(null);
            setCategoryName('');
        }
        setShowModal(true);
    };

    // Handle adding or updating a category
    const handleSaveCategory = () => {
        if (currentCategory) {
            // Update category
            setCategories(categories.map(cat =>
                cat.id === currentCategory.id ? { ...cat, name: categoryName } : cat
            ));
        } else {
            // Add new category
            const newCategory = {
                id: categories.length + 1,
                name: categoryName
            };
            setCategories([...categories, newCategory]);
        }
        setShowModal(false);
    };

    // Handle deleting a category
    const handleDeleteCategory = (id) => {
        setCategories(categories.filter(cat => cat.id !== id));
    };

    return (
        <div className="container mx-auto p-6">
            <div className="row mb-4">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h2>Gestion des Catégories</h2>
                    <Button variant="primary" onClick={() => handleShowModal()}>
                        Ajouter une catégorie
                    </Button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom de la Catégorie</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => handleShowModal(category)}
                                        >
                                            Mettre à jour
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteCategory(category.id)}
                                        >
                                            Supprimer
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Add/Update Category */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formCategoryName">
                            <Form.Label>Nom de la Catégorie</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrer le nom de la catégorie"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleSaveCategory}>
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CategoryManagement;
