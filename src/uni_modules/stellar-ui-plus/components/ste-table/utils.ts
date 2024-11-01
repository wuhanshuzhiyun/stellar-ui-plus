type StyleOrClassFunction<T> = (params: object) => T
type StyleOrClass<T> = T | StyleOrClassFunction<T> | undefined

function getStyleOrClass<T extends string | object>(fun: StyleOrClass<T>, params: object = {}): T | undefined {
  if (typeof fun === 'function' && fun instanceof Function)
    return (fun as StyleOrClassFunction<T>)(params)
  else
    return fun
}

export { getStyleOrClass }
