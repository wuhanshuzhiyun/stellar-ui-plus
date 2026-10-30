export interface ComponentProps {
  name: string
  description: string
  type: string
  values?: {
    name: string | number
    description: string
  }[]
  default?: string | number | boolean | object | null
  version?: string
}

export interface ComponentEvents {
  name: string
  description: string
  type: string
  params?: { name?: string, description?: string }[]
  version?: string
}

export interface ComponentMethods {
  name: string
  description: string
  params?: { name?: string, description?: string }[]
  returnValue?: string
  version?: string
}

export interface ComponentSlots {
  name: string
  description: string
  params?: { name?: string, description?: string }[]
  version?: string
}

export interface ComponentDesc {
  site: string
  attr?: string[]
  props?: ComponentProps[]
  events?: ComponentEvents[]
  methods?: ComponentMethods[]
  slots?: ComponentSlots[]
}
