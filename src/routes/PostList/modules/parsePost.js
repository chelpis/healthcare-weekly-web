import he from 'he'

const parsePost = (data) => ({
  id: data.guid,
  title: data.title,
  content: he.decode(data.description),
  author: {
    avatarUrl: data.extensions['chelpis-cms'].avatar[0].value,
    ...data.author
  },
  date: data.publishedParsed,
  extensionsChelpisCms: data.extensions['chelpis-cms'] || {},
  categories: data.categories,
  isCollected: data.isCollected
})
export default parsePost
