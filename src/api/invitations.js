const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
const INVITATIONS_ENDPOINT = `${STRAPI_URL}/api/invitations?populate=photos`

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
    id: Number(item.id_num || item.id),
    documentId: item.documentId,
    name: item.name,
    price: item.price,
    category: item.category,
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
