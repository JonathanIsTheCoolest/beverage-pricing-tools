export const toCamelCase = (string: string) => {
  return string.split(' ').map((item, index) => {
    return index !== 0 ? item[0].toUpperCase().concat(item.slice(1, item.length).toLowerCase()) : item.toLowerCase()
  }).join('')
}

export const formatErrorKey = (string: string) => {
  return `missing${string.charAt(0).toUpperCase() + string.slice(1)}`
}