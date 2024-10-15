import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  answer?: string;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    text: "What's the difference between horsepower and torque?",
    answer: "Horsepower is a measure of an engine's overall power output, while torque is the rotational force that causes acceleration. In simple terms, horsepower determines top speed, while torque affects how quickly you can accelerate."
  },
  {
    id: 2,
    text: "How often should I change my car's oil?",
    answer: "For most modern vehicles, it's recommended to change the oil every 7,500 to 10,000 miles or once a year, whichever comes first. However, always check your vehicle's owner manual for the manufacturer's specific recommendations."
  }
];

const QandA: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [newQuestion, setNewQuestion] = useState('');

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const newQuestionObj: Question = {
        id: questions.length + 1,
        text: newQuestion.trim()
      };
      setQuestions([...questions, newQuestionObj]);
      setNewQuestion('');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Q&A Forum</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
        <form onSubmit={handleSubmitQuestion} className="flex">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Questions</h2>
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <MessageCircle className="text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">{question.text}</h3>
                  {question.answer && (
                    <p className="mt-2 text-gray-700">{question.answer}</p>
                  )}
                </div>
              </div>
              {!question.answer && (
                <p className="text-sm text-gray-500 italic">This question is waiting for an expert answer.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QandA;