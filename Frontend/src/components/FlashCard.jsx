import { motion } from "framer-motion";
import { useState } from "react";
import Home from "../pages/Home";
function FlashCard({ question, answer, category, tags }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleFlip = () => {
        if (!isAnimating) {
            setIsFlipped(!isFlipped);
            setIsAnimating(true);
        }
    };

    return (
        <div>
          
        <div className="flex justify-center p-2   bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flip-card w-[400px] h-[260px] rounded-lg shadow-xl transition-transform duration-700 ease-in-out hover:shadow-2xl" onClick={handleFlip}>
                <motion.div
                    className="flip-card-inner w-full h-full relative"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 360 }}
                    transition={{ duration: 0.6, animationDirection: "normal" }}
                    onAnimationComplete={() => setIsAnimating(false)}
                >
                    <div className="flip-card-front w-full h-full bg-white rounded-lg p-6 border border-gray-200 flex flex-col justify-center items-center text-center">
                        <span className="p-2 mb-4 text-xs bg-blue-100 text-blue-800 font-semibold rounded-lg">{category}</span>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">{question}</h2>
                        <div className="flex flex-wrap justify-center">
                            {tags.map((tag) => (
                                <span className="p-2 m-1 text-sm text-blue-600  rounded-lg" key={tag}>#{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flip-card-back w-full h-full bg-blue-600 rounded-lg p-6 border border-blue-700 flex flex-col justify-center items-center text-center text-white">
                        <h1 className="text-2xl font-bold mb-4">Answer</h1>
                        <h2 className="text-lg font-medium">{answer}</h2>
                    </div>
                </motion.div>
            </div>
        </div>
        
     </div>
    );
}

export default FlashCard;
