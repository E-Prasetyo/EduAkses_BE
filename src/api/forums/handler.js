class ForumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.validator = validator; // ✅ Penting

    this.getThreads = this.getThreads.bind(this);
    this.getThreadById = this.getThreadById.bind(this);
    this.createThread = this.createThread.bind(this);
    this.createComment = this.createComment.bind(this);
    this.likeComment = this.likeComment.bind(this);
    this.unlikeComment = this.unlikeComment.bind(this);
  }

  async getThreads(request, h) {
    const { page = 1, limit = 10 } = request.query;
    const threads = await this._service.getThreads({ page, limit });
    return h.response({ status: "success", data: { threads } });
  }

  async getThreadById(request, h) {
    const { id } = request.params;
    const thread = await this._service.getThreadById(id);
    return h.response({ status: "success", data: { thread } });
  }

  async createThread(request, h) {
    this._validator.validateThreadPayload(request.payload);

    const { title, body } = request.payload;
    const authorId = request.auth.credentials.userId;

    const threadId = await this._service.createThread({
      title,
      body,
      authorId,
    });

    return h.response({ status: "success", data: { threadId } }).code(201);
  }

  async createComment(request, h) {
    this._validator.validateCommentPayload(request.payload);

    const { id: threadId } = request.params;
    const { body: text, parent_id } = request.payload;
    const authorId = request.auth.credentials.userId;

    const commentId = await this._service.createComment({
      threadId,
      body: text,
      parentId: parent_id,
      authorId,
    });

    return h.response({ status: "success", data: { commentId } }).code(201);
  }

  async likeComment(request, h) {
    const { id: commentId } = request.params;
    const userId = request.auth.credentials.userId;

    await this._service.likeComment({ commentId, userId });

    return h.response({ status: "success" });
  }

  async unlikeComment(request, h) {
    const { id: commentId } = request.params;
    const userId = request.auth.credentials.userId;

    await this._service.unlikeComment({ commentId, userId });

    return h.response({ status: "success" });
  }
}

module.exports = ForumsHandler;
