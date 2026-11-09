import React from "react"
import { BsStarFill } from "react-icons/bs"

export default function ReviewsPage() {
    const reviewsData = [
        {
            rating: 5,
            name: "Elliot",
            date: "January 3, 2023",
            text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
            id: "1",
        },
        {
            rating: 5,
            name: "Sandy",
            date: "December 12, 2022",
            text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
            id: "2",
        },
    ]

    return (
        <section className="text-[#161616]">
            <div className="flex items-baseline gap-4 mb-4">
                <h2 className="text-3xl font-extrabold">Your reviews</h2>
                <p className="text-gray-700">
                    Last <span className="font-bold underline">30 days</span>
                </p>
            </div>
            <img
                className="w-full max-w-2xl my-8 rounded-md"
                src="/assets/images/reviews-graph.png"
                alt="Review graph"
            />
            <h3 className="text-2xl font-bold mb-6">Reviews ({reviewsData.length})</h3>
            <div className="space-y-6">
                {reviewsData.map((review) => (
                    <div key={review.id} className="border-b border-gray-300 pb-6">
                        <div className="flex gap-1 mb-2 text-[#ff8c38]">
                            {[...Array(review.rating)].map((_, i) => (
                                <BsStarFill key={i} />
                            ))}
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <p className="font-bold text-[#161616]">{review.name}</p>
                            <p className="text-gray-500 text-sm">{review.date}</p>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.text}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

