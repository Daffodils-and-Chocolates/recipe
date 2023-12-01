import React from "react";

const ArticleCard = ({number  }) => {
    const xlWidthClass = number === 5 ? 'xl:w-[23%]' : (number === 4 ? 'xl:w-[30%]' : '');
    return (
        <div className={`inline-flex flex-col justify-between shadow hover:shadow-lg rounded-lg w-full sm:w-[45%] md:w-1/3 lg:w-1/4 ${xlWidthClass}`}>
            <a className="=hover:border-primary hover:text-primary" href="/recipe/123">
                <div className="flex flex-col justify-between h-full">
                    <div className="relative h-full w-full">
                        {/* postImage */}
                        <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-[#fffcf5d3] p-4 flex justify-between">
                            <h4 className="font-bold">
                                {/* {user} */}
                            </h4>
                            <span className="text-sm">
                                {/* {createdAt} */}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 p-4">
                        <h4 className="font-bold text-lg">
                            {/* {title} */}
                        </h4>
                        <p className="text-sm">
                            {/* {caption} */}
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default ArticleCard;
