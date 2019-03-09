export const formatterListToDropdown = (initData) => {
  if (!Array.isArray(initData)) return []

  return initData.reduce((init, item) => {
    init.push({
      key: item.id,
      value: item.id,
      text: item.title,
    })

    return init
  }, [])
}
