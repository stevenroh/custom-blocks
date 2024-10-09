import { useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { useState } from "@wordpress/element";
import { Article } from "../../components/Article";

const POST_TYPE = "menu_item";
// const POST_TYPE = "post";

export const Carousel = ({ attributes }) => {
  const [category, setCategory] = useState(null);

  console.log(attributes);
  let queryParamsPosts,
    queryParamsCategories = {};

  if (attributes?.category) {
    queryParamsPosts = {
      categories: attributes.category,
    };
    queryParamsCategories = {
      parent: attributes.category,
    };
  }

  const { posts, categories } = useSelect((select) => {
    return {
      posts: select(coreDataStore).getEntityRecords("postType", POST_TYPE, {
        per_page: 100,
        _embed: true,
        acf_format: "standard",
        context: "view",
        ...queryParamsPosts,
      }),
      categories: select(coreDataStore).getEntityRecords(
        "taxonomy",
        "category",
        queryParamsCategories
      ),
    };
  }, []);

  // console.table(posts);

  const handleCategoryChange = (categoryId, e) => {
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
    // if (post.categories.length === 0 && category) return false;

    return post.categories.includes(category);
  };

  // console.log(posts);
  const filteredPosts = posts?.filter((post) => shouldDisplayPost(post));

  return (
    <>
      <ul className="rohs-categories-filter">
        {/* <li className="rohs-categories-filter__category">
          <a
            className="rohs-button-filter"
            href="#"
            onClick={(e) => handleCategoryChange(null, e)}
          >
            <span className="rohs-button-filter__inner">Tout</span>
          </a>
        </li> */}
        {categories?.map((cat) => (
          <li className="rohs-categories-filter__category" key={cat.id}>
            <a
              className="rohs-button-filter"
              href="#"
              onClick={(e) => handleCategoryChange(cat.id, e)}
            >
              <span className="rohs-button-filter__inner">{cat.name}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="rohs-posts-container grid grid-cols-2 gap-4">
        {filteredPosts?.length ? (
          filteredPosts.map((post) => <Article post={post} />)
        ) : (
          <span>Aucun article n'a été trouvé</span>
        )}
      </div>
    </>
  );
};
