import React, { useState } from 'react'
import CommentForm from './CommentForm';
import Comment from './Comment';

import { useSelector } from "react-redux";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewComment,
  deleteComment,
  updateComment,
} from "../../services/index/comments";
import { toast } from "react-hot-toast";

const CommentsConatiner = ({
    logginedUserId,
    comments,
    postSlug,
}) => {
    const [affectedComment, setAffectedComment] = useState(null);//only edit and reply not delete
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);

    console.log(comments);

    const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
        useMutation({
            mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
                return createNewComment({ token, desc, slug, parent, replyOnUser });
            },
            onSuccess: () => {
                toast.success(
                    "Your comment is sent successfully, it will be visible after the confirmation of the Admin"
                );
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const { mutate: mutateUpdateComment } = useMutation({
        mutationFn: ({ token, desc, commentId }) => {
            return updateComment({ token, desc, commentId });
        },
        onSuccess: () => {
            toast.success("Your comment is updated successfully");
            queryClient.invalidateQueries(["blog", postSlug]);
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const { mutate: mutateDeleteComment } = useMutation({
        mutationFn: ({ token, desc, commentId }) => {
            return deleteComment({ token, commentId });
        },
        onSuccess: () => {
            toast.success("Your comment is deleted successfully");
            queryClient.invalidateQueries(["blog", postSlug]);
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
        mutateNewComment({
            desc: value,
            parent,
            replyOnUser,
            token: userState.userInfo.token,
            slug: postSlug,
        });
        setAffectedComment(null);
    };

    const updateCommentHandler = (value, commentId) => {
        mutateUpdateComment({
            token: userState.userInfo.token,
            desc: value,
            commentId,
        });
        setAffectedComment(null);
    };

    const deleteCommentHandler = (commentId) => {
        mutateDeleteComment({ token: userState.userInfo.token, commentId });
    };

    return (
        <>
            <CommentForm
                formSubmitHanlder={(value) => addCommentHandler(value)}
                loading={isLoadingNewComment}
            />
            <div className="w-full sm:w-4/5 mx-auto flex flex-col gap-6">
                <h3 className="font-bold text-2xl">Comments</h3>
                <div className="flex flex-col gap-6">

                    {comments.map((comment, index) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            logginedUserId={logginedUserId}
                            affectedComment={affectedComment}
                            setAffectedComment={setAffectedComment}
                            addComment={addCommentHandler}
                            updateComment={updateCommentHandler}
                            deleteComment={deleteCommentHandler}
                            replies={comment.replies}
                        />
                    ))}

                </div>
            </div>
        </>
    )
}

export default CommentsConatiner;
