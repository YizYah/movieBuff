export const filmQuery = `
match (m:Movie {title:$title}) return m
`
