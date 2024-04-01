import React from 'react';
import { useState } from 'react';
import ModuleModal from '../components/modal/ModuleModal';

const products = [
    {
        id: 1,
        name: 'Basic Tee',
        href: 'products/1',
        imageSrc: 'img/gear.png',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 2,
        name: 'Basic Tee2',
        href: 'products/2',
        imageSrc: 'img/gear.png',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 3,
        name: 'Basic Tee3',
        href: 'products/3',
        imageSrc: 'img/gear.png',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 4,
        name: 'Basic Tee4',
        href: 'products/4',
        imageSrc: 'img/gear.png',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 5,
        name: 'Basic Tee5',
        href: 'products/5',
        imageSrc: 'img/gear.png',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    }
]
function MainPage() {
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

    // TODO : Ajax 통신으로 수정, 삭제
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log('Update Data:', formData);
        setIsModalOpen(false);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        console.log('Delete Data:', formData);
        setIsModalOpen(false);
    }

    return (
        <>
            <div>
                {isModalOpen && (
                    <ModuleModal
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        closeModal={toggleModal}
                    />
                )}
            </div>
            <div className="bg-gray-800">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div className='group-hover:opacity-75'>
                                <a key={product.id} href={product.href} className="group">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                        <img
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-sm text-zinc-200">{product.name}</h3>
                                </a>
                                <p className="mt-1 text-lg font-medium text-zinc-400">{product.price}</p>
                                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                    onClick={console.log("수정")}>
                                    수정
                                </button>
                                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                    onClick={console.log("삭제")}>
                                    삭제
                                </button>
                            </div>
                        ))}
                        <div key="test" className="group" onClick={toggleModal}>
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src="img/module_plus.png"
                                    alt="test"
                                    className="h-full w-full object-cover object-center group-hover:opacity-75 bg-transparent"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-zinc-200">test</h3>
                            <p className="mt-1 text-lg font-medium text-zinc-400">test</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;
