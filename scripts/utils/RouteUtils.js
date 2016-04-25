export function constructUrl(route) {
  const { path, query } = route;
  let result = path.join('/');
  let queryArr = [];
  if (query && typeof query === 'object') {
    queryArr = Object.keys(query).sort()
      .filter(key => query[key] !== null)
      .map(key => `${ key }=${ query[key] }`);
  }

  if (queryArr.length > 0) {
    result += `?${ queryArr.join('&') }`;
  }

  return result;
}