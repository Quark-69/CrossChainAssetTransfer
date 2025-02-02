import React from 'react';
import { Link } from 'react-router-dom';

const StyledPage = () => {
  return (
    <div className="min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-20 gap-16 font-sans">
      {/* Header */}
      <header className="justify-self-center">
        <img src="/api/placeholder/120/40" alt="Logo" className="dark:invert" />
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center">Welcome to Our Platform</h1>

        <ol className="font-mono text-sm leading-6 tracking-tight list-inside pl-0 space-y-2">
          <li>First connect your <code className="bg-black/5 dark:bg-white/5 px-1 py-0.5 rounded font-semibold">wallet</code></li>
          <li>Then approve the <code className="bg-black/5 dark:bg-white/5 px-1 py-0.5 rounded font-semibold">transaction</code></li>
          <li>Finally confirm the <code className="bg-black/5 dark:bg-white/5 px-1 py-0.5 rounded font-semibold">transfer</code></li>
        </ol>

        <div className="flex gap-4 mt-4">
          <Link 
            to="/connect-wallet"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors min-w-[180px]"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
};

export default StyledPage;
