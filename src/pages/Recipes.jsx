import React from 'react'
import MainLayout from '../components/MainLayout'
import { images } from '../constants';
import ArticleCard from '../components/ArticleCard';

import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";
import ErrorMessage from "../components/ErrorMessage";


const Recipes = () => {

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"],
        onError: (error) => {
          toast.error(error.message);
          console.log(error);
        },
      });    

    return (
        <MainLayout>
            <section>
                <div className="block bg-no-repeat bg-cover bg-top w-[100vw] h-[25vw]" style={{ backgroundImage: `url(${images.recipesImageBanner})` }} />
                <hr className='w-auto h-0.5 bg-black' />
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
                        data?.data.map((post) => (
                            <ArticleCard
                                key={post._id}
                                post={post}
                                number={4}
                            />
                        ))
                    )}
                </div>
            </section>
        </MainLayout>
    )
}

export default Recipes