"use strict";

const routes = (handler) => [
  {
    method: "GET",
    path: "/forums/threads",
    handler: handler.getThreads,
    options: {
      auth: { strategy: "eduaksessapp_jwt", scope: ["user", "pengajar"] },
      validate: { query: handler._validator.queryThreads },
    },
  },
  {
    method: "GET",
    path: "/forums/threads/{id}",
    handler: handler.getThreadById,
    options: {
      auth: { strategy: "eduaksessapp_jwt", scope: ["user", "pengajar"] },
      validate: { params: handler.validator.threadIdParam },
    },
  },
  {
    method: "POST",
    path: "/forums/threads",
    handler: handler.createThread,
    options: {
      auth: { strategy: "eduaksessapp_jwt", scope: ["user", "pengajar"] },
      validate: { payload: handler.validator.createThread },
    },
  },
  {
    method: "POST",
    path: "/forums/threads/{id}/comments",
    handler: handler.createComment,
    options: {
      auth: { strategy: "eduaksessapp_jwt", scope: ["user", "pengajar"] },
      validate: {
        params: handler.validator.threadIdParam,
        payload: handler.validator.createComment,
      },
    },
  },
  {
    method: "POST",
    path: "/forums/comments/{id}/like",
    handler: handler.likeComment,
    options: {
      auth: { strategy: "eduaksessapp_jwt", scope: ["user", "pengajar"] },
      validate: { params: handler.validator.commentIdParam },
    },
  },
  {
    method: "DELETE",
    path: "/forums/comments/{id}/like",
    handler: handler.unlikeComment,
    options: {
      auth: { strategy: "eduaksessapp_jwt", scope: ["user", "pengajar"] },
      validate: { params: handler.validator.commentIdParam },
    },
  },
];

module.exports = routes;
