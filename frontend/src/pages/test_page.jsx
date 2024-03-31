
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalForm from '../components/modal/ModalForm';
function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const sendMessage = () => {
        if (!inputValue.trim()) return;
        setMessages([...messages, inputValue]);
        setInputValue('');
    };

    return (
        <div className="flex flex-col h-full">
            {/* 채팅 내역 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((message, index) => (
                    <div key={index} className="break-words p-2 bg-gray-200 rounded-md">
                        {message}
                    </div>
                ))}
            </div>
            {/* 메시지 입력 및 전송 부분 */}
            <div className="p-4">
                <input
                    type="text"
                    className="input border-2 border-gray-300 p-2 rounded-md w-full"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    보내기
                </button>
            </div>
        </div>
    );
}
function TestPage() {
    const { id } = useParams();
    // TODO : ajex로 데이터 받아오고 이름 넣기
    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* 왼쪽 섹션 */}
            <div className="flex-1 bg-red-200">
                <Chat />
            </div>
            {/* 중앙 섹션 */}
            <div className="flex-1 flex flex-col justify-center items-center bg-green-200 space-y-4">
                {/* 가로로 긴 상자, 마우스 호버 시 배경색 변경 */}
                <div className="w-3/4 h-20 bg-gray-100 rounded flex justify-center items-center hover:bg-gray-300 transition duration-300">
                    NODE1
                </div>
            </div>
            {/* 오른쪽 섹션 */}
            <div className="flex-1 flex justify-center items-center bg-blue-200">
                <div className="chat-message">
                    <div className="flex items-start mb-4">
                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                            alt="My profile"
                            className="w-12 h-12 rounded-full order-1" />
                        <div className="flex flex-col space-y-2 text-sm max-w-md mx-2 order-2 items-start">
                            <div>
                                <span className="px-6 py-4 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                    Can be verified on any platform using docker
                                    Can be verified on any platform using docker
                                    Can be verified on any platform using docker
                                    Can be verified on any platform using docker
                                    Can be verified on any platform using docker
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestPage;
