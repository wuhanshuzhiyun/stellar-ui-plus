import { ref } from 'vue'

export default function usePcContent() {
  // TODO: implement
  const content = ref('')

  const activeName = ref('handbook-介绍')

  const datas = ref([
    {
      name: 'handbook-介绍',
      content: '介绍',
    },
    {
      name: 'handbook-安装',
      content: '安装',
    },
    {
      name: 'handbook-使用',
      content: '使用',
    },
    {
      name: 'handbook-配置',
      content: '配置',
    },
  ])

  return { content, activeName, datas }
}
