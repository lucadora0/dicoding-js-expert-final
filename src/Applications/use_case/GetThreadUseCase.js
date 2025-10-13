const DetailThread = require('../../Domains/threads/entities/DetailThread');
const Comment = require('../../Domains/comments/entities/Comment');

class GetThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const { threadId } = useCasePayload;
    const thread = await this._threadRepository.getThreadById(threadId);
    const comments = await this._commentRepository.getCommentsByThreadId(threadId);

    const mappedComments = comments.map((comment) => new Comment({
      id: comment.id,
      username: comment.username,
      date: comment.date.toISOString(),
      content: comment.content,
      isDelete: comment.is_delete,
    }));

    return new DetailThread({
      ...thread,
      date: thread.date.toISOString(),
      comments: mappedComments,
    });
  }
}

module.exports = GetThreadUseCase;
