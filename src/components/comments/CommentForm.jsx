import React, { useState } from 'react'
import { images } from '../../constants/index';
import { TiDelete } from "react-icons/ti";

const CommentForm = ({
    formSubmitHanlder,
    formCancelHandler = null,
    initialText = "",
    loading = false,
}) => {
    const submitHandler = (e) => {
        e.preventDefault(); //so page wont refresh on submit
        formSubmitHandler(value);
        setValue("");//blank form after submitting
    }
    const [value, setValue] = useState(initialText);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredCancel, setIsHoveredCancel] = useState(false);
    const leftAlign = formCancelHandler ? '' : 'mx-auto';
    return (
        <div className={`my-10 w-full sm:w-2/3 md:w-1/2 ${leftAlign} flex justify-start flex-col gap-6`}>
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
                <div className="flex flex-col relative ">
                    <textarea onChange={(e) => setValue(e.target.value)} value={value} id="message" rows="4" required="" aria-required="true" placeholder="Leave a comment..." className="py-2 px-4 border bg-gray-100 rounded-lg focus:outline outline-primary" />
                </div>
                <div className='flex flex-col gap-2 lg:flex-row xl:flex-row'> {/*the buttons*/}
                    <button
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        type="submit"
                        className="hover:bg-yellow-500 hover:text-white py-2 px-5 shadow-lg font-semibold flex items-center justify-center max-h-max text-center rounded-lg gap-3 max-w-max"
                        tabIndex="0"
                    >
                        Post comment
                        <img src={isHovered ? images.postPaperPlaneWhite : images.postPaperPlaneYellow} alt="Post Paper Plane" />
                    </button>
                    {formCancelHandler && (
                        <button
                            onClick={formCancelHandler}
                            onMouseEnter={() => setIsHoveredCancel(true)}
                            onMouseLeave={() => setIsHoveredCancel(false)}
                            type="submit"
                            className="hover:bg-yellow-500 hover:text-white py-2 px-5 shadow-lg font-semibold flex items-center justify-center max-h-max text-center rounded-lg gap-3 max-w-max"
                            tabIndex="0"
                        >
                            Cancel
                            <TiDelete
                                className={`${isHoveredCancel ? 'text-white' : 'text-yellow-500'} `}
                            />
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default CommentForm;