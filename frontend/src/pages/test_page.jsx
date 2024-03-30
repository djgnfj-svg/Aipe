
import React, { useState } from 'react';
import ModalForm from '../components/modal/ModalForm';

function TestPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
    });

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={toggleModal} /* Button attributes */>
                Toggle modal
            </button>
            {isModalOpen && (
                <ModalForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    closeModal={toggleModal}
                />
            )}
        </>
    )
};

export default TestPage;
