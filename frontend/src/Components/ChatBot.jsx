import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Home, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Namaste! Welcome to SilverBrick. I'm your AI assistant. How can I help you find your dream property today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            let response = "";
            const query = userMsg.toLowerCase();

            if (query.includes('buy') || query.includes('purchase')) {
                response = "We have a wide range of premium properties for sale. You can explore them in our Properties section!";
            } else if (query.includes('sell') || query.includes('list')) {
                response = "Thinking of selling? Our expert agents provide the best market valuation. Visit our Contact page to get started!";
            } else if (query.includes('agent') || query.includes('expert')) {
                response = "Our elite agents are ready to assist you. Check the Agents section to meet them.";
            } else if (query.includes('login') || query.includes('admin')) {
                response = "You can sign in using the Sign In option in the navbar. Admins and Agents have dedicated dashboards.";
            } else if (query.includes('contact') || query.includes('call')) {
                response = "You can reach us at +91 8707538123 or visit our Contact page.";
            } else {
                response = "That's a great question! For more detailed assistance, please explore our FAQ section or contact our support team.";
            }

            setMessages(prev => [...prev, { type: 'bot', text: response }]);
            setIsTyping(false);
        }, 900);
    };

    const quickActions = [
        { label: 'Browse Properties', path: '/properties', icon: <Home size={14} /> },
        { label: 'Meet Agents', path: '/agents', icon: <User size={14} /> },
        { label: 'View FAQ', path: '/faq', icon: <HelpCircle size={14} /> }
    ];

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] font-sans">

            {/* Chat Window */}
            <div
                className={`absolute bottom-20 right-0 
                w-[95vw] sm:w-[380px] max-w-[380px] 
                bg-white rounded-2xl sm:rounded-[2rem] 
                shadow-2xl border border-gray-200 
                overflow-hidden transition-all duration-500 origin-bottom-right 
                ${isOpen
                        ? 'scale-100 opacity-100 translate-y-0'
                        : 'scale-0 opacity-0 translate-y-10'
                    }`}
            >

                {/* Header */}
                <div className="bg-black p-4 sm:p-5 text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Bot size={18} className="text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">SilverBrick AI</h4>
                            <p className="text-[10px] text-gray-300">Online</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-lg transition"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Messages */}
                <div className="h-[280px] sm:h-[320px] overflow-y-auto p-4 sm:p-5 space-y-3 bg-gray-50">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm ${msg.type === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 border rounded-tl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white border px-4 py-2 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-4 py-3 flex flex-wrap gap-2 bg-white border-t">
                    {quickActions.map(action => (
                        <button
                            key={action.path}
                            onClick={() => {
                                navigate(action.path);
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-600 rounded-lg text-xs font-semibold transition"
                        >
                            {action.icon}
                            {action.label}
                        </button>
                    ))}
                </div>

                {/* Input */}
                <form
                    onSubmit={handleSend}
                    className="p-3 sm:p-4 bg-white border-t flex gap-2"
                >
                    <input
                        type="text"
                        placeholder="Ask me anything..."
                        className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-200 outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:scale-105 transition"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>

            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${isOpen
                        ? 'bg-white text-black scale-90 rotate-90'
                        : 'bg-indigo-600 text-white hover:scale-110'
                    }`}
            >
                {isOpen ? <X size={26} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
};

export default ChatBot;