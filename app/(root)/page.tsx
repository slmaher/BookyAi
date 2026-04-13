import React from 'react';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';

const Page = () => {
    return (
      <main className="wrapper container">
        <HeroSection />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
          <h2 className="text-3xl font-serif font-bold text-[#212a3b]">
            Recent Books
          </h2>
          <Search />
        </div>

        <div className="library-books-grid">
          {books.map((book) => (
            <Boo
              key={book._id}
              title={book.title}
              author={book.author}
              coverURL={book.coverURL}
              slug={book.slug}
            />
          ))}
        </div>
      </main>
    );
};

export default Page;