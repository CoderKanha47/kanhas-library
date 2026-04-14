import { useState } from 'react';

const BOOKS = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", category: "Fiction", status: "Available", cover: "📚", borrowedDate: null, returnDate: null, coverImage: null, coverImage: "book2.jpg", price: "0", type: "rental" },
  { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self-Help", status: "Checked Out", cover: "📈", borrowedDate: "23-02-2026", returnDate: "23-03-2026", coverImage: "book1.jpg", price: "0", type: "rental" },
  { id: 3, title: "Project Hail Mary", author: "Andy Weir", category: "Sci-Fi", status: "Available", cover: "🚀", borrowedDate: null, returnDate: null, coverImage: "book3.jpg", price: "0", type: "rental" },
  { id: 4, title: "The Maze Runner", author: "James Dashner", category: "Sci-Fi", status: "Not-Available", cover: "🚀", borrowedDate: null, returnDate: null, coverImage: "book6.jpg", price: "0", type: "rental" },
  { id: 5, title: "A Brief History of Time", author: "Stephen Hawkin", category: "Sci-Fi", status: "Available", cover: "🚀", borrowedDate: null, returnDate: null, coverImage: "book5.jpg", price: "0", type: "rental" },
  { id: 4, title: "Life of Pi", author: "<NotAvailable>", category: "Adventure", status: "Available", cover: "🚀", borrowedDate: null, returnDate: null, coverImage: "book4.jpg", price: "0", type: "rental" },
];




function App() {
  // --- 1. HOOKS (Must be exactly like this at the top) ---
  const [reviewingBook, setReviewingBook] = useState(null);
  const [reviewText, setReviewText] = useState(""); // Fixed: Added useState
  const [rating, setRating] = useState(5);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Logic for Recently Borrowed
  const recentlyBorrowed = BOOKS.find(b => b.status === "Checked Out") || BOOKS[0];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900">

      {/* --- HEADER --- */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">K</div>
            <h1 className="text-xl font-black tracking-tighter text-blue-900">KANHA'S LIBRARY</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">My Books</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Wishlists</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Orders</a>
          </nav>
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search library..."
              className="bg-gray-100 border-none rounded-full px-5 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* --- MAIN BODY --- */}
      <main className="grow">
        {/* Hero Section */}
        <section className="bg-blue-50 py-12 px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8 border border-blue-100">
            <div className="w-40 h-56 bg-blue-600 rounded-lg shadow-lg flex items-center justify-center text-6xl overflow-hidden">
              {recentlyBorrowed.coverImage ? (
                <img
                  src={recentlyBorrowed.coverImage}
                  alt={recentlyBorrowed.title}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-6xl'>{recentlyBorrowed.cover}</div>
              )}
            </div>

            <div className="text-center md:text-left">
              <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">Currently Reading</span>
              <h2 className="text-3xl font-bold mt-2 mb-4 tracking-tight">How are you enjoying <br /> <span className="italic text-gray-700">"{recentlyBorrowed.title}"</span>?</h2>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                <button
                  onClick={() => setReviewingBook(recentlyBorrowed)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all cursor-pointer">Write Review</button>

                <div className='relative group/tooltip'>
                  <button className="border border-gray-200 px-6 py-2 rounded-full font-semibold hover:bg-gray-50 transition-all cursor-not-allowed opacity-70">Return Early</button>
                  {/* Tooltip text */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover/tooltip:scale-100 transition-all duration-200 rounded bg-slate-800 px-3 py-1.5 text-[10px] text-white whitespace-nowrap font-bold shadow-xl z-20">
                    Not Available
                    {/* Optional: Small triangle arrow pointing down */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></span>
                  </span>

                </div>

                <button 
                  onClick={() => setSelectedBook(recentlyBorrowed)}
                  className="bg-white border-2 border-blue-100 text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-all cursor-pointer">View Payments</button>
              </div>

              {/* Date Display */}
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Borrowed</p>
                  <p className="text-sm font-bold text-slate-700 bg-slate-100/80 px-4 py-1.5 rounded-lg border border-slate-200/50 backdrop-blur-sm">
                    {recentlyBorrowed.borrowedDate || "Not Set"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-red-500 uppercase font-black tracking-widest mb-1">Due Date</p>
                  <p className="text-sm font-bold text-red-600 bg-red-50 px-4 py-1.5 rounded-lg border border-red-200/60 ring-2 ring-red-500/5">
                    {recentlyBorrowed.returnDate || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-bold mb-8">Browse Catalog</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BOOKS.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase())).map(book => (
              <div key={book.id} className="group flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center text-3xl shrink-0">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className='w-full h-full object-cover transform group-hover:scale-110 transition duration-700'
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-blue-50">{book.cover}</div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-lg text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{book.title}</h4>
                  <p className="text-gray-500 text-sm mt-1">{book.author}</p>
                  <p className="text-[10px] mt-3 text-blue-600 font-black uppercase tracking-widest">{book.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- MODALS --- */}
      {/* Payment Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-slate-900">Payment Details</h2>
              <button onClick={() => setSelectedBook(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold cursor-pointer">×</button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 text-sm">Amount Paid</span>
                <span className="text-sm font-bold text-slate-800">₹{selectedBook.price}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 text-sm">Purchase Type</span>
                <span className="text-sm font-bold text-blue-600 uppercase tracking-tighter">{selectedBook.type}</span>
              </div>
            </div>
            <button onClick={() => setSelectedBook(null)} className="w-full mt-8 bg-slate-900 text-white py-3 rounded-2xl font-bold cursor-pointer">Close</button>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewingBook && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Write a Review</h2>
              <button onClick={() => setReviewingBook(null)} className="text-slate-400 hover:text-slate-600 text-2xl cursor-pointer">×</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setReviewingBook(null); }}>
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button key={num} type="button" onClick={() => setRating(num)}
                    className={`w-10 h-10 rounded-xl font-bold transition-all ${rating >= num ? 'bg-yellow-400 text-white' : 'bg-slate-100 text-slate-400'}`}>★</button>
                ))}
              </div>
              <textarea required rows="4" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your thoughts..." onChange={(e) => setReviewText(e.target.value)}></textarea>
              <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-4 rounded-2xl font-bold cursor-pointer">Submit Review</button>
            </form>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-xs">
          © 2026 Kanha's Library Project. Built with React & Tailwind.
        </div>
      </footer>
    </div>
  );
}

export default App;