export const formatDate = (dateString) => {
  const options = {
    timeStyle: "short",
    dateStyle: "long",
  };
  const date = new Date(dateString);
  return `${date.toLocaleString("fr-FR", options)}`;
};

export const getPostFeaturedImage = (post) => {
  if (post._embedded["wp:featuredmedia"])
    return post._embedded["wp:featuredmedia"][0].source_url;

  return false;
};

export const renderPostCategories = (post) => {
  const wpTerms = post._embedded["wp:term"] || [];

  if (wpTerms.length == 0) return;
  return wpTerms[0].map((t) => t.name);
};
