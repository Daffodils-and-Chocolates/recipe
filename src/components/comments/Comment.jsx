import React from 'react'
import { images, stables } from "../../constants";
import { FaRegMessage } from "react-icons/fa6";
import { MdDelete, MdModeEdit } from "react-icons/md";
import CommentForm from './CommentForm';

const Comment = ({
    comment,
    logginedUserId,
    affectedComment,
    setAffectedComment,
    addComment,
    parentId = null,
    updateComment,
    deleteComment,
    replies,
}) => {
    const isUserLoggined = Boolean(logginedUserId);
    const commentBelongsToUser = logginedUserId === comment.user._id;
    const isReplying =
        affectedComment &&
        affectedComment.type === "replying" &&
        affectedComment._id === comment._id;
    const isEditing =
        affectedComment &&
        affectedComment.type === "editing" &&
        affectedComment._id === comment._id;
    const repliedCommentId = parentId ? parentId : comment._id;
    const replyOnUserId = comment.user._id;
    // console.log("is editing boolean : "+Boolean(affectedComment != null) +" " +Boolean(affectedComment.type==='editing')+" "+Boolean(affectedComment._id === comment._id));
    // console.log("affectedComment : "+affectedComment);

    return (
        <div className="border-2 border-gray-200 rounded-xl flex flex-col sm:flex-row gap-4 p-6 items-start">
            <div className="flex flex-col gap-1 w-full">
                <div className='flex flex-row'>
                    <div className="h-auto w-auto">
                        <img
                            src={
                                comment?.user?.avatar
                                    ? stables.UPLOAD_FOLDER_BASE_URL + comment.user.avatar
                                    : images.userImage
                            }
                            alt="user profile"
                            className="w-9 h-9 object-cover rounded-full"
                        />
                    </div>
                    <div className="flex w-full justify-between flex-col sm:flex-row px-2">
                        <h4 className="font-bold text-lg">{comment.user.name}</h4>
                        <div className="flex gap-2 items-center text-sm">
                            <svg stroke="#d09d1d" fill="#d09d1d" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"></path>
                            </svg>
                            {new Date(comment.createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                            })}
                        </div>
                    </div>
                </div>
                <div className='ml-6'>
                    {!isEditing && (
                        <div className="flex justify-between">
                            <p>{comment.desc}</p>
                        </div>
                    )}
                    {isEditing && (
                        <CommentForm
                            formSubmitHandler={(value) => updateComment(value, comment._id)}
                            formCancelHandler={() => setAffectedComment(null)}
                            initialText={comment.desc}
                        />
                    )}
                    {!isEditing && (
                        <div className="flex items-center gap-x-3 text-[#808080] font-roboto text-sm mt-3 mb-3" >
                            {idUserLoggedIn && (
                                <button className="flex items-center space-x-2"
                                    onClick={() => {
                                        setAffectedComment({ type: 'replying', _id: comment._id });
                                        // console.log("affectedComment : "+affectedComment);
                                    }}
                                >
                                    <FaRegMessage className="w-4 h-auto text-yellow-500" />
                                    <span>Reply</span>
                                </button>
                            )}
                            {commentBelongsToUser && (
                                <>
                                    <button className="flex items-center space-x-2"
                                        onClick={() => {
                                            setAffectedComment({ type: 'editing', _id: comment._id });
                                            // console.log("affectedComment : "+affectedComment);
                                        }}
                                    >
                                        <MdModeEdit className="w-4 h-auto text-yellow-500" />
                                        <span>Edit</span>
                                    </button>
                                    < button
                                        className="flex items-center space-x-2"
                                        onClick={() => deleteComment(comment._id)}
                                    >
                                        <MdDelete className="w-4 h-auto text-yellow-500" />
                                        <span>Delete </span>
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {isReplying &&
                        <CommentForm
                            formSubmitHandler={(value) =>
                                addComment(value, replyCommentId, replyOnUserId)
                            }
                            formCancelHandler={() => setAffectedComment(null)}
                        />
                    }
                    {replies.length > 0 && (
                        <div>
                            {replies.map((reply) => (
                                <Comment
                                    key={reply._id}
                                    addComment={addComment}
                                    affectedComment={affectedComment}
                                    setAffectedComment={setAffectedComment}
                                    comment={reply}
                                    deleteComment={deleteComment}
                                    logginedUserId={logginedUserId}
                                    replies={[]}
                                    updateComment={updateComment}
                                    parentId={comment._id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div >
        </div >
    )
}

export default Comment;