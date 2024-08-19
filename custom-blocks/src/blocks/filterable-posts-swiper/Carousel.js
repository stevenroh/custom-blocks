import { register } from "swiper/element/bundle";
register();

import { useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

import { decodeEntities } from "@wordpress/html-entities";
import { useState } from "@wordpress/element";

import { formatDate, getPostFeaturedImage } from "../../utils";

export const Carousel = ({ attributes }) => {
  const [category, setCategory] = useState(null);

  const { posts, categories } = useSelect((select) => {
    return {
      posts: select(coreDataStore).getEntityRecords("postType", "post", {
        per_page: 100,
        _embed: true, //HERE
      }),
      categories: select(coreDataStore).getEntityRecords(
        "taxonomy",
        "category"
      ),
    };
  }, []);

  // Get default cat
  const defaultCat = categories?.find((cat) => cat.slug === "uncategorized");

  console.log(categories);
  const handlrohstegoryChange = (categoryId, e) => {
    e.preventDefault();
    setCategory(categoryId);
  };

  const renderPostCategories = (post) => {
    const wpTerms = post._embedded["wp:term"] || [];

    if (wpTerms.length == 0) return;
    return wpTerms[0].map((t) => t.name);
  };

  const shouldDisplayPost = (post) => {
    // no category has been selected
    if (category == null) return true;

    // post has no categories but category has been selected
    if (post.categories.length === 0 && category) return false;

    return post.categories.includes(category);
  };

  console.table(posts);
  // console.table(categories);

  const filteredPosts = posts?.filter((post) => shouldDisplayPost(post));

  return (
    <>
      <ul className="rohs-categories-filter">
        <li className="rohs-categories-filter__category">
          <a
            className="rohs-button-filter"
            href="#"
            onClick={(e) => handlrohstegoryChange(null, e)}
          >
            <span className="rohs-button-filter__inner">Tout</span>
          </a>
        </li>
        {categories
          ?.filter((cat) => cat.parent === defaultCat.id)
          .map((cat) => (
            <li className="rohs-categories-filter__category" key={cat.id}>
              <a
                className="rohs-button-filter"
                href="#"
                onClick={(e) => handlrohstegoryChange(cat.id, e)}
              >
                <span className="rohs-button-filter__inner">{cat.name}</span>
              </a>
            </li>
          ))}
      </ul>

      {filteredPosts?.length ? (
        <swiper-container slides-per-view="3" space-between="20">
          {filteredPosts?.map((post) => (
            <swiper-slide key={post.id}>
              <a href={post.link} target="_blank" alt={post.title.rendered}>
                <div className="rohs-news-post">
                  <img
                    className="rohs-news-post__image rohs-rounded"
                    src={
                      getPostFeaturedImage(post) ||
                      "https://placehold.co/400x400"
                    }
                  />

                  <div className="rohs-news-post__content">
                    <p className="rohs-news-post__content__date">
                      {formatDate(post.date)}
                    </p>

                    <h2 className="rohs-news-post__content__title">
                      {decodeEntities(post.title.raw)}
                    </h2>

                    <p>{renderPostCategories(post)}</p>
                  </div>
                </div>
              </a>
            </swiper-slide>
          ))}
        </swiper-container>
      ) : (
        <span>Aucun article n'a été trouvé</span>
      )}
    </>
  );
};
