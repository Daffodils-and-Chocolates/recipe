import React from "react";

import { images, stables } from "../constants";
import { Link } from "react-router-dom";

const ArticleCard = ({ number, post }) => {
    const xlWidthClass = number === 5 ? 'xl:w-[20%]' : (number === 4 ? 'xl:w-[30%]' : '');
    return (
        <div className={`inline-flex flex-col justify-between shadow hover:shadow-lg rounded-lg w-full sm:w-[45%] md:w-1/3 lg:w-1/4 ${xlWidthClass}`}>
            <Link className="=hover:border-primary hover:text-primary" to={`/recipe/${post.slug}`}>
                <div className="flex flex-col justify-between h-full">
                    <div className="relative h-full w-full">
                        <img
                            src={
                                post.photo
                                    ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
                                    : images.samplePostImage
                            }
                            alt={post.title}
                            className="h-auto w-auto aspect-[36/22] object-cover object-center rounded-t"
                            style = {{ width : "fit-content"}}
                        />
                        <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-[#fffcf5d3] p-4 flex justify-between">
                            <div className="inline-flex justify-left gap-x-2 items-center">
                                <img
                                    src={
                                        post.user.avatar
                                            ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                                            : images.userImage
                                    }
                                    alt="post profile"
                                    className="w-9 h-9 md:w-10 md:h-10 rounded-full"
                                />
                                <h4 className="font-bold"> {post.user.name} </h4>
                            </div>
                            <span className="text-sm flex justify-center items-center">
                                {new Date(post.createdAt).getDate()}{" "}
                                {new Date(post.createdAt).toLocaleString("default", {
                                    month: "long",
                                })}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 p-4">
                        <h4 className="font-bold text-lg">{post.title}</h4>
                        <p className="text-sm">{post.caption}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ArticleCard;
