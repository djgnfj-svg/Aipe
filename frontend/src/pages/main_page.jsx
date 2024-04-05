import React from 'react';
import { useState, useEffect } from 'react';
import ModuleModal from '../components/modal/ModuleModal';
import axios from 'axios';

function MainPage() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        // price: '',
        // category: '',
        shumnail: '',
        description: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = process.env.REACT_APP_API_URL; // 환경 변수에서 API URL을 가져옴
            try {
                const response = await axios.get(`${apiUrl}/api/modules/`);
                setProducts(response.data);
            } catch (error) {
                console.error("There was an error!", error);
            }
        };

        fetchData();
    }, []);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setFormData({
            name: '',
            // price: '',
            // category: '',
            shumnail: '',
            description: '',
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

        const apiUrl = process.env.REACT_APP_API_URL; // 환경 변수에서 API URL을 가져옴
        try {
            // 서버에 POST 요청을 보내고 응답을 기다림
            const response = await axios.post(`${apiUrl}/api/modules/`, formData);
            console.log('Form submit response:', response.data);

            // 모달 닫기
            setIsModalOpen(false);

            // 폼 데이터 초기화
            setFormData({
                name: '',
                // price: '',
                // category: '',
                shumnail: '',
                description: '',
            });

            // 제품 목록 새로 고침
            // 이 부분은 추가 구현이 필요할 수 있음
            // 예를 들어, 상품 목록 상태를 업데이트하는 로직 등
        } catch (error) {
            console.error("There was an error submitting the form:", error);
        }
    };

    // TODO : Ajax 통신으로 수정, 삭제
    const handleUpdate = async (productId) => {
        // 업데이트를 위한 폼 데이터 설정, 예를 들어:
        const updateData = {
            name: 'Updated Product Name',
            description: 'Updated Description',
            // 기타 필요한 데이터...
        };

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.put(`${apiUrl}/api/modules/${productId}/`, updateData);
            console.log('Update response:', response.data);

            // 성공적으로 업데이트한 후 제품 목록을 새로 고침하거나 UI를 업데이트합니다.
            // 예를 들어, fetchData() 함수를 다시 호출하거나, 상태를 직접 업데이트할 수 있습니다.
        } catch (error) {
            console.error("There was an error updating the product:", error);
        }
    };

    // delete 기능 구현
    const handleDelete = async (productId) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.delete(`${apiUrl}/api/modules/${productId}/`);
            console.log('Delete response:', response.data);

            // 성공적으로 삭제한 후 제품 목록을 새로 고침하거나 UI를 업데이트합니다.
            // 예를 들어, fetchData() 함수를 다시 호출하거나, 상태를 직접 업데이트할 수 있습니다.
        } catch (error) {
            console.error("There was an error deleting the product:", error);
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
                                            src={product.shumnail}
                                            /* alt={product.imageAlt} */
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-sm text-zinc-200">{product.name}</h3>
                                </a>
                                {/* <p className="mt-1 text-lg font-medium text-zinc-400">{product.price}</p> */}
                                <button className="..." onClick={() => handleUpdate(product.id)}>
                                    수정
                                </button>
                                <button className="..." onClick={() => handleDelete(product.id)}>
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
