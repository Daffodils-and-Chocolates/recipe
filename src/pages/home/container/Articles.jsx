import React from 'react'
import ArticleCard from '../../../components/ArticleCard';
import { images } from '../../../constants';
import {useNavigate } from 'react-router-dom'

import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";

const latestCards = [
  {
    id: 101,
    photo: images.donuts,
    title: "Masala Dosa",
    user: "Ramesh Kumar",
    createdAt: "Aug 10, 2023",
    caption:
      "Masala Dosa is a popular South Indian dish that consists of a thin, crispy crepe made from fermented...",
  },
  {
    id: 103,
    photo: images.donuts,
    title: "Masala Dosa",
    user: "Ramesh Kumar",
    createdAt: "Aug 10, 2023",
    caption:
      "Masala Dosa is a popular South Indian dish that consists of a thin, crispy crepe made from fermented...",
  },
  {
    id: 102,
    photo: images.donuts,
    title: "Masala Dosa",
    user: "Ramesh Kumar",
    createdAt: "Aug 10, 2023",
    caption:
      "Masala Dosa is a popular South Indian dish that consists of a thin, crispy crepe made from fermented...",
  },
  {
    id: 104,
    photo: images.donuts,
    title: "Masala Dosa",
    user: "Ramesh Kumar",
    createdAt: "Aug 10, 2023",
    caption:
      "Masala Dosa is a popular South Indian dish that consists of a thin, crispy crepe made from fermented...",
  },
];

const Articles = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleClick = () => {
    // Navigate to "/recipes"
    navigate("/recipes");
  };

  return (
    <section className=''>
      <div className='px-20 py-5 flex justify-between'>
        <div className='p-2 text-xl'>LATEST </div>
        <button 
        className='border-2 border-yellow-500 px-4 py-2 rounded-md font-semibold bg-yellow-400 hover:bg-yellow-500 text-white transition-all duration-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'
        onClick={handleClick}
        >
          See more
        </button>
      </div>
      <hr className='mx-20 w-auto h-0.5 bg-black' />

      <div className="mx-10 items-center justify-center flex flex-wrap py-10 gap-10">
        {isLoading ? (
          [...Array(3)].map((item, index) => (
            <ArticleCardSkeleton
              key={index}
              number={4}
            />
          ))
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch the posts data" />
        ) : (
          data?.data.slice(0,3).map((post) => (
            <ArticleCard
              key={post._id}
              post={post}
              number={4}
            />
          ))
        )}
      </div>

    </section>
  )
}

export default Articles;