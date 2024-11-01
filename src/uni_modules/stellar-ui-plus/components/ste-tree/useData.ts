import { computed, nextTick, ref, watch } from 'vue'
import utils from '../../utils/utils'
import type { TreeNode } from '../../types'
import type { SteTreeProps } from './props'

export default function useData({ props, emits }: {
  props: SteTreeProps
  emits: {
    (e: 'click', node: TreeNode): void
    (e: 'beforeOpen', node: TreeNode, suspend: () => void, next: (tree?: TreeNode[]) => void, stop: () => void): void
    (e: 'open', node: TreeNode): void
    (e: 'close', node: TreeNode): void
  }
}) {
  const dataOptions = ref(props.options)
  const setDataOptions = (options: TreeNode[]) => {
    dataOptions.value = options
  }

  const viewOptions = ref<TreeNode[]>([])
  const setViewOptions = (options: TreeNode[]) => {
    viewOptions.value = options
  }

  const viewList = ref<TreeNode[]>([])
  const setViewList = (options: TreeNode[]) => {
    viewList.value = options
  }

  const dataSearchTitle = ref('')
  const setDataSearchTitle = (title: string) => {
    dataSearchTitle.value = title
  }

  const cmpPaddingLeft = computed(() => utils.formatPx(props.childrenPadding, 'num'))

  const formatTree = (tree: TreeNode[], parentNode?: number | string, depth?: number) => {
    return utils.formatTree(
      tree,
      {
        valueKey: props.valueKey,
        childrenKey: props.childrenKey,
        otherAttributes(node) {
          return { open: false, loading: false, hasChildren: !!node[props.childrenKey]?.length }
        },
        parentNode,
        depth,
      },
    )
  }

  const rende = () => {
    nextTick(() => {
      if (!viewOptions?.value.length) {
        setViewList([])
        return
      }
      setViewList(utils.flattenTree(viewOptions.value, props.childrenKey, node => node?.open))
    })
  }

  const findNode = (tree: TreeNode[], value: string | number) => {
    return utils.findTreeNode(tree, value, props.valueKey, props.childrenKey)
  }

  const beforeOpen = async (node: TreeNode) => {
    let is_next = true
    const _beforeOpen = new Promise((resolve, reject) => {
      emits('beforeOpen', node, () => {
        is_next = false
        node.loading = true
      }, (children = []) => {
        const _children = formatTree(children, node[props.valueKey], node.depth + 1)
        resolve(_children)
      }, () => reject(new Error('beforeOpen stop')))
    })
    if (!is_next) {
      try {
        const children = await _beforeOpen
        node[props.childrenKey] = children
        node.loading = false
      }
      catch (e) {
        node.loading = false
        throw e
      }
    }
  }

  const setNodeOpen = (nodeValue: string | number, open: boolean) => {
    const node = findNode(viewOptions.value, nodeValue)
    if (!node)
      return null
    if (props.accordion) {
      const sibling = viewList.value.filter(
        s => s.open && s.parentNode === node.parentNode && s[props.valueKey] !== node[props.valueKey],
      )
      sibling.forEach(s => setNodeOpen(s[props.valueKey], false))
    }
    if (dataOptions.value !== viewOptions.value) {
      // 同步到数据中
      const _node = findNode(dataOptions.value, nodeValue)
      if (_node)
        _node.open = open
    }
    node.open = open
    return node
  }

  const open = async (value: string | number) => {
    const node = findNode(viewOptions.value, value)
    if (!node)
      return
    if (!dataSearchTitle.value)
      await beforeOpen(node)

    setNodeOpen(node[props.valueKey], true)
    if (node.parentNode !== '__root__') {
      const getParents = (_node: TreeNode) => {
        const parents: TreeNode[] = []
        const parent = findNode(viewOptions.value, _node.parentNode)
        if (parent) {
          parents.push(parent)
          if (parent.parentNode !== '__root__')
            parents.push(...getParents(parent))
        }
        return parents
      }
      const parents = getParents(node)
      parents.forEach((parent) => {
        if (parent.open)
          return
        setNodeOpen(parent[props.valueKey], true)
      })
    }
    rende()
  }

  const init = () => {
    setDataOptions(formatTree(props.options))
    setViewOptions(dataOptions.value)
    if (props.openNodes?.length)
      props.openNodes.forEach(v => open(v))
    else rende()
  }

  let searchTime = 0
  const setSearchTime = (callback: () => void, time: number) => {
    clearTimeout(searchTime)
    searchTime = setTimeout(() => {
      callback()
    }, time)
  }

  const onSearch = (title: string) => {
    setSearchTime(() => {
      if (!title) {
        if (viewOptions.value !== dataOptions.value)
          viewOptions.value = dataOptions.value

        rende()
        return
      }
      setViewOptions(utils.filterTree(
        dataOptions.value,
        node => node[props.titleKey]?.indexOf(title) !== -1,
        props.valueKey,
        props.childrenKey,
      ))
      rende()
    }, 500)
  }

  watch(() => props.options, () => init(), { immediate: true })

  watch(() => props.searchTitle, setDataSearchTitle, { immediate: true })

  watch(() => dataSearchTitle.value, onSearch, { immediate: true })

  const onClick = (node: TreeNode) => {
    emits('click', node)
  }

  const closeNode = (value: string | number) => {
    const node = setNodeOpen(value, false)
    if (!node)
      return
    emits('close', node)
    rende()
  }

  const openNode = async (node: TreeNode) => {
    try {
      await open(node[props.valueKey])
      emits('open', node)
      rende()
    }
    catch (e) {
      // TODO handle the exception
    }
  }

  const onOpen = (node: TreeNode) => {
    if (node.open)
      closeNode(node[props.valueKey])
    else openNode(node)
  }

  return {
    init,
    viewList,
    cmpPaddingLeft,
    onClick,
    open,
    closeNode,
    onOpen,
    setDataSearchTitle,
  }
}
