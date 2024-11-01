import type { PropType } from 'vue'
import type { InputAccept, InputCapture, UploadFileType } from '../../types'

export default {
  modelValue: { type: Array as PropType<UploadFileType[]>, default: () => [] },
  accept: { type: String as PropType<InputAccept>, default: () => 'image' },
  capture: { type: Array as PropType<('album' | 'camera')[]>, default: () => ['album', 'camera'] },
  camera: { type: String as PropType<InputCapture>, default: () => 'back' },
  compressed: { type: Boolean, default: () => true },
  maxDuration: { type: Number, default: () => 60 },
  previewWidth: { type: [String, Number], default: () => 200 },
  previewHeight: { type: [String, Number], default: () => 200 },
  previewImage: { type: Boolean, default: () => true },
  previewFullImage: { type: Boolean, default: () => true },
  multiple: { type: Boolean, default: () => false },
  disabled: { type: Boolean, default: () => false },
  showUpload: { type: Boolean, default: () => true },
  deletable: { type: Boolean, default: () => true },
  maxSize: { type: Number, default: () => 0 },
  maxCount: { type: Number, default: () => 9 },
  uploadIcon: { type: String, default: () => '&#xe69b;' },
  uploadText: { type: String, default: () => '点击上传' },
  radius: { type: [String, Number], default: () => 9 },
  flexWrap: { type: String, default: () => 'wrap' },
}
