"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [value, setValue] = useState(searchParams.get("query") || "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (value.trim()) {
      router.push(`?query=${encodeURIComponent(value.trim())}`);
    } else {
      router.push("");
    }
  };

  const handleTyping = (value:string)=>{
    setValue(value);
    if(!value){
      router.back();
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full mt-6 flex justify-end">
      <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only">
        Search
      </label>
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="search" id="search" className="block w-full p-3 ps-9 pr-20 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search movies..." required value={value} onChange={(e) => handleTyping(e.target.value)}/>
        <button type="submit" className="absolute end-1.5 bottom-1.5 text-white bg-brand hover:red-600 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none pointer-cursor">
          Search
        </button>
      </div>
    </form>
  );
}


{/* <form onSubmit={handleSearch} className="w-full mt-6 flex justify-end">
  <label
    htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only"
  >
    Search
  </label>

  <div className="relative w-full max-w-md">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
      </svg>
    </div>

    <input type="search" id="search" className="block w-full p-3 ps-9 pr-20 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search movies..." required value={value} onChange={(e) => handleTyping(e.target.value)}/>

    <button type="submit" className="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">
      Search
    </button>
  </div>
</form> */}