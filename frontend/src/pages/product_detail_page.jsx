import React, { useState } from 'react';

function Chat({ ischat, messages, onSendMessage, isSending }) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((message, index) => (
                    <div key={index} className="break-words p-2 bg-gray-200 rounded-md">
                        {message}
                    </div>
                ))}
            </div>
            <div className="p-4 flex items-center">
                <input
                    type="text"
                    className="input border-2 border-gray-300 p-2 rounded-md flex-grow"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isSending}
                />
                <button
                    onClick={() => inputValue.trim() !== '' && onSendMessage(inputValue)}
                    className={`ml-2 px-4 py-2 rounded-md ${isSending ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    disabled={isSending}
                >
                    보내기
                </button>
            </div>
        </div>
    );
}

function Product_Detail_Page() {
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [nodeStates, setNodeStates] = useState(['bg-gray-100', 'bg-gray-100']);
    const [completedMessages, setCompletedMessages] = useState([]); // 완료 메시지들을 저장할 배열 상태

    const sendMessage = async (message) => {
        setIsSending(true);
        setMessages([...messages, message]);

        for (let i = 0; i < nodeStates.length; i++) {
            const updatedNodeStates = [...nodeStates];
            updatedNodeStates[i] = 'bg-yellow-500';
            setNodeStates(updatedNodeStates);

            await new Promise(resolve => setTimeout(resolve, 1000));

            updatedNodeStates[i] = 'bg-gray-100';
            setNodeStates(updatedNodeStates);
        }

        // 완료 메시지를 배열에 추가
        setCompletedMessages([...completedMessages, "모든 메시지 처리가 완료되었습니다."]);
        setIsSending(false);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="flex-1 bg-red-200">
                <Chat isSending={isSending} messages={messages} onSendMessage={sendMessage} />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center bg-green-200 space-y-4">
                {nodeStates.map((nodeState, index) => (
                    <div key={index} className={`w-3/4 h-20 ${nodeState} rounded flex justify-center items-center transition duration-300`}>
                        NODE {index + 1}
                    </div>
                ))}
            </div>
            {/* 오른쪽 섹션 */}
            <div className="flex-1 flex justify-center items-center bg-blue-200">
                <div className="chat-message">
                    <div className="flex flex-col items-start mb-4">
                        {completedMessages.map((msg, index) => (
                            <div key={index} className="flex items-start space-y-2 text-sm max-w-md mx-2 order-2 mt-4">
                                <span className="px-6 py-4 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                    {msg}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product_Detail_Page;
