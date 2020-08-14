import React, { FC, memo } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { required } from '../../../helpers/validators';
import {
  Textarea,
  createField,
  GetStringKeys
} from '../../common/FormsControl/FormsControl';
import { PostType } from '../../../types/types';

export type MapPostsPropsType = { posts: Array<PostType> };
export type DispatchPropsType = { addPost: (newPostText: string) => void };

const MyPosts: FC<MapPostsPropsType & DispatchPropsType> = ({
  posts,
  addPost
}) => {
  let postsElements = posts.map((p) => (
    <Post key={p.id} message={p.message} likes={p.likes} />
  ));

  const addNewPost = (values: AddPostFormValuesType) => {
    addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <PostReduxForm onSubmit={addNewPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

const MyPostsMemo = memo(MyPosts);

type PropsType = {};
type AddPostFormValuesType = { newPostText: string };
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const AddNewPostForm: FC<
  InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType
> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {createField<AddPostFormValuesTypeKeys>(
          'Post message',
          'newPostText',
          [required],
          Textarea
        )}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const PostReduxForm = reduxForm<AddPostFormValuesType, PropsType>({
  form: 'ProfileAddNewPostForm'
})(AddNewPostForm);
export default MyPostsMemo;
