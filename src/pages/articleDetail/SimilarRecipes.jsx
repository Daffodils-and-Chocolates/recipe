import React from 'react'
import ArticleCard from '../../components/ArticleCard';
import Tags from '../../components/Tags';
import { images } from '../../constants';

import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";


const SimilarRecipes = ({ header, posts = [], tags }) => {

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"],
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    return (
        <section className=''>
            <div className='py-1 flex justify-between'>
                <div className='p-1 text-xl'>SIMILAR </div>
            </div>
            <hr className='w-auto h-0.5 bg-[#dcdfe2]' />

            <div className="mx-10 items-center justify-center flex flex-wrap py-10 gap-10">
                {isLoading ? (
                    [...Array(3)].map((item, index) => (
                        <ArticleCardSkeleton
                            key={index}
                            number={5}
                        />
                    ))
                ) : isError ? (
                    <ErrorMessage message="Couldn't fetch the posts data" />
                ) : (
                    posts.slice(0,4).map((post, index) => (
                        <ArticleCard
                            key={index}
                            post={post}
                            number={5}
                        />
                    ))
                )}
            </div>

            <div className='item-center flex gap-4'>
                TAGS :
                    <Tags TagArray={tags} />
            </div>


        </section>
    )
}

export default SimilarRecipes;