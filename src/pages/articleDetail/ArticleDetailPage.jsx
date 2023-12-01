import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import MainLayout from '../../components/MainLayout';
import SimilarRecipies from './SimilarRecipes';
import Tags from '../../components/Tags';
import CommentsConatiner from '../../components/comments/CommentsConatiner';

import { images, stables } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getSinglePost } from "../../services/index/posts";
import ArticleDetailSkeleton from "../../components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { useSelector } from "react-redux";
import parseJsonToHtml from "../../utils/parseJsonToHtml";
import Editor from "../../components/editor/Editor";

const ArticleDetailPage = () => {
    const { slug } = useParams();
    const userState = useSelector((state) => state.user);
    const [body, setBody] = useState(null);

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getSinglePost({ slug }),
        queryKey: ["blog", slug],
        onSuccess: (data) => {
            setBody(parseJsonToHtml(data?.body));
        },
    });

    const { data: postsData } = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"],
    });

    return (
        <MainLayout>
            {/* {isLoading ? (
                <ArticleDetailSkeleton />
            ) : isError ? (
                <ErrorMessage message="Couldn't fetch the post detail" />
            ) : ( */}
            <section className='box flex flex-col gap-8 mt-10 m-20'>
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="basis-1/3">
                        <img
                            className="rounded w-full"
                            src={
                                data?.photo
                                    ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                                    : images.samplePostImage
                            }
                            alt={data?.title}
                        />
                    </div>
                    <div className="basis-2/3 flex flex-col gap-2">
                        <div className="flex justify-between">
                            <h2 className="font-bold text-xl md:text-3xl">{data?.title}</h2>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="flex gap-2 items-center font-semibold">
                                <img src={images.chefCap} />
                                {data?.user.name}
                            </p>
                        </div>
                        <div className='text-xl'>
                            {/* category */}
                            {/* Category :
                                    <Link to={`/recipes?category=${category.name}`} className='text-yellow-600 px-3'>
                                        {category.name}
                                    </Link> */}
                        </div>
                        <div className='flex gap-3 items-center'>
                            {/* Tags */}
                            <pre className='text-xl'>Tags   :</pre>
                            <Tags TagArray={data ? data.tags : []} />
                        </div>
                        <p>
                            {/* Donuts, also known as doughnuts, are a popular type of fried or baked pastry. They are typically round with a hole in the center, though there are various shapes and flavors available. The dough is made from ingredients like flour, sugar, yeast, and often eggs and milk, resulting in a soft and slightly sweet texture. Donuts are commonly enjoyed as a breakfast treat or a snack, and they have become a beloved staple of many cuisines around the world. */}
                            {!isLoading && !isError && (
                                <Editor content={data?.body} editable={false} />
                            )}
                        </p>
                        {/* cokkingtime & Calories */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between w-2/3 mx-auto">
                            <div className="flex flex-col gap-1 items-center">
                                <img src={images.CookingClock} />
                                <h3 className="font-bold text-xl text-[#d09d1d]">
                                    Cooking Time
                                </h3>
                                <p>60 minutes</p>
                            </div>
                            <div className="flex flex-col gap-1 items-center text-gray-800">
                                <img src={images.CaloriesCounter} />
                                <h3 className="font-bold text-xl text-[#d09d1d]">
                                    Calories
                                </h3>
                                <p>450.2 cal</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="basis-1/3 flex flex-col gap-4 border-b-2 md:border-b-0 pb-4 md:pb-0 md:border-r-2 border-gray-200 items-center">
                        <h3 className="font-bold text-2xl">Ingredients</h3>
                        <ol className="flex flex-col gap-2 list-decimal ml-5">
                            {/* ingredients */}
                            {/* {data.ingredients.length === 0 ? (
                                <p className="text-slate-500 text-xs mt-2">
                                    There are not tags for this post
                                </p>
                            ) : (
                                <ul className='flex flex-row gap-2.5'>
                                    {data.ingredients.map((ingredient, index) =>
                                        <li key={index}>
                                            {ingredient}
                                        </li>
                                    )}
                                </ul>
                            )
                            } */}
                            <li>2 1/4 cups all-purpose flour</li>
                            <li>1/2 cup granulated sugar</li>
                            <li>2 teaspoons baking powder</li>
                            <li>1/2 teaspoon salt</li>
                            <li>1/2 cup milk</li>
                            <li>1/4 cup unsalted butter, melted</li>
                            <li>1 large egg</li>
                            <li>1 teaspoon vanilla extract</li>
                            <li>Vegetable oil, for frying</li>
                            <li>Powdered sugar, for dusting</li>
                        </ol>
                    </div>
                    <div className="basis-2/3 flex flex-col gap-4">
                        <h3 className="font-bold text-2xl">Instructions</h3>
                        <ul className="ml-2 flex flex-col gap-4">
                            {/* Instructions */}
                            <li><h4 className="font-bold text-xl">Step 1</h4><p className="ml-2">In a large mixing bowl, whisk together the all-purpose flour, granulated sugar, baking powder, and salt.</p></li><li><h4 className="font-bold text-xl">Step 2</h4><p className="ml-2">In a separate bowl, whisk together the milk, melted unsalted butter, egg, and vanilla extract.</p></li>
                            <li><h4 className="font-bold text-xl">Step 3</h4><p className="ml-2">Gradually add the wet ingredients to the dry ingredients, stirring until just combined. Do not overmix.</p></li>
                            <li><h4 className="font-bold text-xl">Step 4</h4><p className="ml-2">Cover the bowl with plastic wrap and refrigerate the dough for at least 30 minutes.</p></li>
                            <li><h4 className="font-bold text-xl">Step 5</h4><p className="ml-2">On a floured surface, roll out the chilled dough to about 1/2-inch thickness.</p></li>
                            <li><h4 className="font-bold text-xl">Step 6</h4><p className="ml-2">Using a donut cutter or a glass, cut out donut shapes and use a smaller cutter or a bottle cap to cut out the donut holes in the center.</p></li>
                            <li><h4 className="font-bold text-xl">Step 7</h4><p className="ml-2">Heat vegetable oil in a deep pot or a deep fryer to 350°F (175°C).</p></li>
                            <li><h4 className="font-bold text-xl">Step 8</h4><p className="ml-2">Carefully lower the donuts into the hot oil, frying a few at a time, but not overcrowding the pot.</p></li>
                            <li><h4 className="font-bold text-xl">Step 9</h4><p className="ml-2">Fry the donuts for 1-2 minutes per side or until they are golden brown and cooked through.</p></li>
                            <li><h4 className="font-bold text-xl">Step 10</h4><p className="ml-2">Use a slotted spoon to remove the donuts from the oil and place them on a paper towel-lined plate to drain excess oil.</p></li>
                            <li><h4 className="font-bold text-xl">Step 11</h4><p className="ml-2">While the donuts are still warm, dust them with powdered sugar.</p></li>
                            <li><h4 className="font-bold text-xl">Step 12</h4><p className="ml-2">Enjoy these delicious homemade donuts with your favorite coffee or tea!</p></li>
                        </ul>
                    </div>
                </div>
                <SimilarRecipies
                    posts={postsData?.data}
                    tags={data ? data.tags : []}
                />
                <hr />
                {/* <CommentsConatiner
                            comments={data?.comments}
                            className="mt-10"
                            logginedUserId={userState?.userInfo?._id}
                            postSlug={slug}
                        /> */}
            </section>
            {/* )} */}
        </MainLayout>
    )
}

export default ArticleDetailPage;