const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
const INVITATIONS_ENDPOINT = `${STRAPI_URL}/api/invitations?populate[photos]=true&populate[category]=*&sort[0]=order:asc&pagination[pageSize]=1000`
const CATEGORIES_ENDPOINT = `${STRAPI_URL}/api/categories?sort[0]=order:asc`

const absoluteUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url

  return `${STRAPI_URL}${url}`
}

const normalizePhoto = (photo) =>
  absoluteUrl(photo.formats?.large?.url || photo.formats?.medium?.url || photo.url)

const normalizeInvitation = (item) => {
  const photos = Array.isArray(item.photos) ? item.photos.map(normalizePhoto).filter(Boolean) : []

  return {
    id: Number(item.id),
    documentId: item.documentId,
    name: item.name,
    price: item.price,
    category: item.category?.name || '',
    badge: Boolean(item.badge),
    description: item.description,
    photos,
    image: photos[0] || '',
  }
}

export async function fetchInvitations() {
  const response = await fetch(INVITATIONS_ENDPOINT)

  if (!response.ok) {
    throw new Error(`Strapi request failed with status ${response.status}`)
  }

  const json = await response.json()
  return Array.isArray(json.data) ? json.data.map(normalizeInvitation) : []
}

export async function fetchCategories() {
  const response = await fetch(CATEGORIES_ENDPOINT)

  if (!response.ok) {
    throw new Error(`Strapi request failed with status ${response.status}`)
  }

  const json = await response.json()
  const categories = Array.isArray(json.data)
    ? json.data.map((item) => ({ label: item.name, value: item.name }))
    : []

  return [{ label: 'Hammasi', value: 'all' }, ...categories]
}
