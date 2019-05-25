import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './CommentForm.module.scss';

const ACTION_URL = `${process.env.GATSBY_WP_PROTOCOL}://${
  process.env.GATSBY_WP_BASE_URL
}/wp-json/wp/v2/comments`;

class CommentForm extends Component {
  constructor() {
    super();

    this.state = {
      formIsSubmitting: true,
      formSubmittedSuccessfully: false,
    };
  }

  render() {
    const { postId } = this.props;
    const { formIsSubmitting, formSubmittedSuccessfully } = this.state;
    const commentFormClasses = classNames(
      styles.CommentForm,
      formIsSubmitting && styles.CommentFormIsSubmitting
    );

    const submitButtonMarkup = formIsSubmitting ? (
      <input type="submit" value="Submitting comment..." disabled />
    ) : (
      <input type="submit" value="Post comment!" />
    );

    const successMessageMarkup = formSubmittedSuccessfully ? (
      <p className={styles.CommentPostedMessage}>
        Thanks for your comment! It will appear once approved.
      </p>
    ) : null;

    return (
      <div className={commentFormClasses}>
        <h2>Post a comment</h2>
        {successMessageMarkup}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="hidden" id="postId" value={postId} />
          <div className={styles.FormInputWrapper}>
            <label htmlFor="name">Name*</label>
            <input id="name" type="text" required disabled={formIsSubmitting} />
          </div>
          <div className={styles.FormInputWrapper}>
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              type="email"
              required
              disabled={formIsSubmitting}
            />
          </div>
          <div className={styles.FormInputWrapper}>
            <label htmlFor="website">Website</label>
            <input id="website" type="text" disabled={formIsSubmitting} />
          </div>
          <div className={styles.FormInputWrapper}>
            <label htmlFor="comment">Comment*</label>
            <textarea
              id="comment"
              rows="10"
              required
              disabled={formIsSubmitting}
            />
          </div>
          <div className={styles.SubmitButtonWrapper}>{submitButtonMarkup}</div>
        </form>
      </div>
    );
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.setState({
      formIsSubmitting: true,
    });

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
    })
      .then(() => {
        this.setState({
          formIsSubmitting: false,
          formSubmittedSuccessfully: true,
        });
      })
      .catch(error => console.error('Error:', error));
  }
}

export default CommentForm;
