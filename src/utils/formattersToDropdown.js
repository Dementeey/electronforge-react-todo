export const formatterListToDropdown = (initData, action) => {
  if (!Array.isArray(initData)) return []

  return initData.reduce((init, item) => {
    init.push({
      key: item.id,
      value: item.id,
      text: item.title,
      // onClick: (e, { value }) => action(value),
    })

    return init
  }, [])
}
