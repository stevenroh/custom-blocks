import MicroModal from "react-micro-modal";

import {
  renderPostCategories,
  formatDate,
  getPostFeaturedImage,
} from "../utils";

import { decodeEntities } from "@wordpress/html-entities";

export const Article = ({ post }) => {
  console.log(post);

  return (
    <MicroModal
      key={post.id}
      overrides={{
        Overlay: {
          className: "rohs-post__overlay",
        },
        Dialog: {
          className: "rohs-post__dialog",
          style: {
            zIndex: 1000,
            position: "absolute",
          },
        },
      }}
      trigger={(open) => (
        <a
          onClick={open}
          className="rohs-post flex flex-row justify-between items-stretch gap-4"
        >
          <div className="rohs-post__container__left w-4/12">
            <img
              className="rohs-post__container__image"
              src={getPostFeaturedImage(post) || "https://placehold.co/400x400"}
              alt={decodeEntities(post.title.rendered)}
            />
          </div>

          <div className="rohs-post__right w-8/12">
            <div className="rohs-post__content">
              <h2 className="rohs-post__content__title">
                {decodeEntities(post.title.rendered)}
              </h2>

              <p className="rohs-post__content__description">
                {decodeEntities(post.content.rendered)}
              </p>

              <p>{post.acf.price} </p>
              <p>{post.acf.more_content} </p>
            </div>
          </div>
        </a>
      )}
    >
      {(close) => (
        <div className="rohs-post-modal__content flex flex-row justify-between items-stretch gap-4 relative">
          <div className="rohs-post__container__left w-1/2">
            <img
              className="rohs-post__container__image"
              src={getPostFeaturedImage(post) || "https://placehold.co/400x400"}
              alt={decodeEntities(post.title.rendered)}
            />
          </div>

          <div className="rohs-post__right w-1/2">
            <div className="rohs-post__content">
              <h2 className="rohs-post__content__title">
                {decodeEntities(post.title.rendered)}
              </h2>

              <p className="rohs-post__content__description">
                {decodeEntities(post.content.rendered)}
              </p>

              <p>{post.acf.price} </p>
              <p>{post.acf.more_content} </p>
            </div>
          </div>

          <button className="absolute top-0 right-0" onClick={close}>
            X
          </button>
        </div>
      )}
    </MicroModal>
  );
};
