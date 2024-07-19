import type { Group } from '../../pc/types.d'
import ComponentGroups from '../../pc/markdown/componentGroups.json'

export default function useComponents() {
  const deg = /.*components\/ste-([\w\-]+)\/[\w\-]+\.json$/

  const groupData: { [key: string]: Group } = {}

  const componentJson: Obj = import.meta.glob('../../../uni_modules/stellar-plus/components/**/*.json', { eager: true })
  const componentData: Obj = {}
  for (const k in componentJson) {
    const name = k.replace(deg, '$1')
    const component: { group: keyof typeof ComponentGroups, title: string, sort: number } = componentJson[k].default
    componentData[name] = component
    if (!groupData[component.group])
      groupData[component.group] = Object.assign({ contents: [] }, ComponentGroups[component.group])
    groupData[component.group].contents.push({ ...component, name: component.title, key: name, html: '' })
  }

  const datas: Group[] = Object.keys(groupData).map((k) => {
    const group = groupData[k]
    group.contents.sort((a, b) => a.sort - b.sort)
    return group
  })

  datas.sort((a, b) => a.sort - b.sort)
  return datas
}
