import React, { Component } from 'react';

import styles from './CommentsList.module.scss';

class CommentsList extends Component {
  render() {
    const { comments } = this.props;

    const commentList = comments.map(comment => {
      return (
        <li className={styles.CommentsListItem} key={comment.id}>
          <div className={styles.CommentThumbnailWrapper}>
            <img
              className={styles.CommentThumbnail}
              src={comment.author_avatar_urls.wordpress_96}
              alt={comment.author_name}
            />
          </div>
          <div className={styles.Comment}>
            <span className={styles.CommentDetails}>
              {comment.author_url ? (
                <a href={comment.author_url}>
                  <strong>{comment.author_name}</strong>
                </a>
              ) : (
                <strong>{comment.author_name}</strong>
              )}
              <span className={styles.CommentDate}> on {comment.date}</span>
            </span>
            <div
              className={styles.CommentContent}
              dangerouslySetInnerHTML={{
                __html: comment.content,
              }}
            />
          </div>
        </li>
      );
    });

    const commentCountHeadingMarkup =
      comments.length > 0 ? <h2>{comments.length} Comments</h2> : null;
    return (
      <div className={styles.Comments}>
        {commentCountHeadingMarkup}
        <ul className={styles.CommentsList}>{commentList}</ul>
      </div>
    );
  }
}

export default CommentsList;
