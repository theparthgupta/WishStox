// ... existing code ...
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Image from 'next/image';

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  profit: string;
  winRate: string;
  trades: string;
  rating: number;
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5 mb-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-500'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const QuoteIcon = () => (
  <svg className="w-7 h-7 text-green-400 mr-2 inline-block align-top" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 5H5v6h4v4H3V9a4 4 0 0 1 4-4h2zm12 0h-4v6h4v4h-6V9a4 4 0 0 1 4-4h2z" />
  </svg>
);

const testimonials: Testimonial[] = [
  {
    quote: "WishStox has completely changed the way I trade. The AI signals are spot on! My portfolio is up significantly, and I feel more confident in my decisions. The support team is also very responsive.",
    name: "Alex Johnson",
    designation: "Professional Trader",
    src: "/placeholder1.png",
    profit: "+21.2%",
    winRate: "71%",
    trades: "84",
    rating: 5,
  },
  {
    quote: "I love the real-time insights. My portfolio has never looked better. The platform's analytics and risk management tools are a game changer. Highly recommended for anyone serious about investing.",
    name: "Maria Rodriguez",
    designation: "Investor",
    src: "/placeholder2.png",
    profit: "+18.7%",
    winRate: "76%",
    trades: "60",
    rating: 5,
  },
  {
    quote: "The best platform for anyone serious about stock trading. The AI recommendations are accurate and timely. I especially appreciate the detailed trade breakdowns and learning resources.",
    name: "Samuel Lee",
    designation: "Day Trader",
    src: "/placeholder3.png",
    profit: "+20.5%",
    winRate: "85%",
    trades: "107",
    rating: 4,
  },
];

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  // Generate stable random rotations for each testimonial
  const [randomRotations] = useState(() =>
    testimonials.map(() => Math.floor(Math.random() * 21) - 10)
  );

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial: Testimonial, index: number) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotations[index],
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotations[index],
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotations[index],
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4 h-full">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="flex flex-col h-full justify-center"
          >
            <div className="flex items-center gap-4 mb-1">
              <h3 className="text-2xl font-bold text-white dark:text-white">
                {testimonials[active].name}
              </h3>
              <StarRating rating={testimonials[active].rating} />
            </div>
            <p className="text-sm text-gray-300 dark:text-neutral-500 mb-2">
              {testimonials[active].designation}
            </p>
            <div className="flex gap-8 mb-4">
              <div className="flex flex-col items-center">
                <span className="text-green-400 font-bold text-lg">{testimonials[active].profit}</span>
                <span className="text-xs text-gray-400">Profit</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-green-300 font-bold text-lg">{testimonials[active].winRate}</span>
                <span className="text-xs text-gray-400">Win Rate</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-green-200 font-bold text-lg">{testimonials[active].trades}</span>
                <span className="text-xs text-gray-400">Trades</span>
              </div>
            </div>
            <motion.p className="mt-4 text-lg text-gray-300 dark:text-neutral-300 leading-relaxed">
              <QuoteIcon />
              {testimonials[active].quote.split(" ").map((word: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0 mt-8">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialSlider() {
  return <AnimatedTestimonials testimonials={testimonials} autoplay />;
}
