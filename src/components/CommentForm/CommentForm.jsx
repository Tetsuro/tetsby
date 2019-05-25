import React, { Component } from 'react';
import styles from './CommentForm.module.scss';

const ACTION_URL = `${process.env.GATSBY_WP_PROTOCOL}://${
  process.env.GATSBY_WP_BASE_URL
}/wp-json/wp/v2/comments`;

class CommentForm extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { postId } = this.props;

    return (
      <div className={styles.CommentForm}>
        <h2>Post a comment</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="hidden" id="postId" value={postId} />
          <div className={styles.FormInputWrapper}>
            <label htmlFor="name">Name*</label>
            <input id="name" type="text" required />
          </div>
          <div className={styles.FormInputWrapper}>
            <label htmlFor="email">Email*</label>
            <input id="email" type="email" required />
          </div>
          <div className={styles.FormInputWrapper}>
            <label htmlFor="website">Website</label>
            <input id="website" type="text" />
          </div>
          <div className={styles.FormInputWrapper}>
            <label htmlFor="comment">Comment*</label>
            <textarea id="comment" rows="10" required />
          </div>
          <div className={styles.SubmitButtonWrapper}>
            <input type="submit" value="Post comment!" />
          </div>
        </form>
      </div>
    );
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.setState({});

    const [postId, name, email, website, comment] = evt.target.elements;
    const sendData = JSON.stringify({
      post: postId.value,
      author_name: name.value,
      author_url: website.value,
      author_email: email.value,
      content: comment.value,
    });

    fetch(ACTION_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: sendData,
    });
  }
}

export default CommentForm;
