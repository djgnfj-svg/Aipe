import React from 'react';
import { useState, useEffect } from 'react';
import ModuleModal from '../components/modal/ModuleModal';
import axios from 'axios';

function MainPage() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentProductId, setCurrentProductId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        thumbnail: '',
    });

    const fetchData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL; // 환경 변수에서 API URL을 가져옴
        try {
            const response = await axios.get(`${apiUrl}/api/modules/`);
            setProducts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("There was an error!", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    // 모달 토글 함수를 업데이트
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setFormData({
            name: '',
            thumbnail: '',
            description: '',
        });
        if (!isModalOpen) setModalMode('add'); // 모달을 열 때 기본 모드를 'add'로 설정
    };

    const handleOpenUpdateModal = (product) => {
        setFormData({
            // 기존 formData 구조를 유지하면서,
            name: product.name,
            thumbnail: product.thumbnail,
            description: product.description,
        });
        setCurrentProductId(product.id); // 현재 제품 ID를 상태에 저장
        setIsModalOpen(true);
        setModalMode('update'); // 모달 모드를 'update'로 설정
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.REACT_APP_API_URL;

        // FormData 객체 생성과 필요한 데이터 추가
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);

        try {
            if (modalMode === 'add') {
                // 추가 로직
                await axios.post(`${apiUrl}/api/modules/`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                fetchData()
            } else if (modalMode === 'update' && currentProductId) {
                // 업데이트 로직에 현재 선택된 제품의 ID를 사용
                const response = await axios.put(`${apiUrl}/api/modules/${currentProductId}/`, formDataToSend, {
                    headers: { 'Content-Type': 'application/json' },
                });
                setProducts(products.map(product => product.id === currentProductId ? response.data : product));
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('작업에 실패했습니다. 다시 시도해주세요.', error);
            alert('작업에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleDelete = async (productId) => {
        // 사용자에게 삭제를 확인
        const isConfirmed = window.confirm('해당 제품을 삭제하시겠습니까?');
        if (!isConfirmed) {
            return; // 사용자가 취소를 누르면 여기서 함수 종료
        }

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            await axios.delete(`${apiUrl}/api/modules/${productId}/`);
            // 삭제 성공 후 제품 목록에서 해당 제품 제거
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error("There was an error deleting the product:", error);
            alert('제품 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };

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
                                            src={product.thumbnail}
                                            /* alt={product.imageAlt} */
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-6xl text-zinc-200">{product.name}</h3>
                                </a>
                                <p className="mt-1 text-lg font-medium text-zinc-300">{product.description}</p>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                    onClick={() => handleOpenUpdateModal(product)}>
                                    수정
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer ml-4"
                                    onClick={() => handleDelete(product.id)}>
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
                            <h3 className="mt-4 text-2xl text-zinc-200">모듈 추가</h3>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default MainPage;
