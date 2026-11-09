import React from "react"

export default function IncomePage() {
    const transactionsData = [
        { amount: 720, date: "Jan 3, '23", id: "1" },
        { amount: 560, date: "Dec 12, '22", id: "2" },
        { amount: 980, date: "Dec 3, '22", id: "3" },
    ]
    return (
        <section className="text-[#161616]">
            <h1 className="text-3xl font-extrabold mb-4">Income</h1>
            <p className="text-gray-700">
                Last <span className="font-bold underline">30 days</span>
            </p>
            <h2 className="text-4xl font-extrabold my-4">$2,260</h2>
            <img
                className="w-full max-w-2xl my-8 rounded-md"
                src="/assets/images/income-graph.png"
                alt="Income graph"
            />
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Your transactions ({transactionsData.length})</h3>
                <p className="text-gray-700">
                    Last <span className="font-bold underline">30 days</span>
                </p>
            </div>
            <div className="space-y-4">
                {transactionsData.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-white p-6 rounded-md">
                        <h3 className="text-2xl font-bold">${item.amount}</h3>
                        <p className="text-gray-600 font-medium">{item.date}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

