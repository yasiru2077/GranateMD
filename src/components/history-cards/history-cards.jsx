import React, { useState } from 'react';
import data from "../../data-files/treatments-and-preventions"

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-orange-50 rounded-lg p-6 max-w-lg w-full mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 font-serif">{title}</h2>
        <div className="font-serif text-gray-600">
          {content}
        </div>
      </div>
    </div>
  );
};

const HistoryCards = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      id: 1,
      title: "Card 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper est eu turpis imperdiet, sit amet suscipit justo cursus."
    },
    {
      id: 2,
      title: "Card 2",
      content: "Ut sit amet enim vel dui venenatis ultrices. Sed efficitur tortor vitae odio sollicitudin, ac bibendum sapien facilisis."
    },
    {
      id: 3,
      title: "Card 3",
      content: "Integer et enim nec dolor condimentum elementum. Fusce ac lorem vitae tortor mattis convallis in nec magna."
    }
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  // Close modal when clicking outside
  // const handleBackdropClick = (e) => {
  //   if (e.target === e.currentTarget) {
  //     handleCloseModal();
  //   }
  // };

  return (
    <>
      <div className="max-w-2xl mx-auto my-12 rounded-lg p-5">
        <h2 className="text-center text-xl font-bold mb-6 font-serif text-gray-800">
          History
        </h2>
        
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className="bg-orange-50 rounded-lg p-5 mb-5 border border-black cursor-pointer transition-transform duration-300 hover:-translate-y-1 font-serif"
          >
            <h3 className="mt-0 text-gray-600 font-bold">{card.title}</h3>
            <p className="text-gray-600">{card.content}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={selectedCard?.title}
        content={selectedCard?.content}
      />
    </>
  );
};

export default HistoryCards;