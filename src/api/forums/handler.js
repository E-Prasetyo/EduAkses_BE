class ForumsHandler {
  constructor(service) {
    this._service = service;

    this.getForumByIdHandler = this.getForumByIdHandler.bind(this);
    this.getCommentsByForumIdHandler =
      this.getCommentsByForumIdHandler.bind(this);
    this.postCommentHandler = this.postCommentHandler.bind(this);
  }

  async getForumByIdHandler(request, h) {
    const { id } = request.params;
    const forum = await this._service.getForumById(id);
    return h.response({ status: "success", data: forum });
  }

  async getCommentsByForumIdHandler(request, h) {
    const { id } = request.params;
    const comments = await this._service.getCommentsByForumId(id);
    return h.response({ status: "success", data: comments });
  }

  async postCommentHandler(request, h) {
    const { id } = request.params;
    const { author, content } = request.payload;
    const commentId = await this._service.addComment(id, { author, content });
    return h
      .response({
        status: "success",
        message: "Comment added",
        data: { commentId },
      })
      .code(201);
  }
}

module.exports = ForumsHandler;
