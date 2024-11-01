import type { InputAccept, ReadFileOptions, UploadFileType } from '../../types'

/**
 * @type {{accept: "image" | "video";capture:("album" | "camera")[];camera:"back" | "front";compressed:boolean;maxDuration:number;multiple:boolean;count:number;}}
 */
const _options = {
  accept: 'image',
  capture: ['album', 'camera'],
  camera: 'back',
  compressed: true,
  maxDuration: 60,
  multiple: false,
  count: 9,
}

/**
 * 读取本地媒体文件
 */
export function readMediaFile(options: ReadFileOptions = {}): Promise<UploadFileType[]> {
  const { accept, capture, camera, compressed, maxDuration, multiple, count } = Object.assign(_options, options)
  return new Promise((resolve, reject) => {
    if (count < 1)
      return reject(new Error('count不能小于1'))

    // #ifdef MP-WEIXIN
    wx.chooseMedia({
      count,
      mediaType: [accept],
      sourceType: capture,
      camera,
      sizeType: [compressed ? 'compressed' : 'original'],
      maxDuration,
      success(res) {
        const tempFiles = res.tempFiles
        const result = tempFiles.map((item) => {
          const m: UploadFileType = {
            url: '',
            name: '',
            size: item.size,
            path: item.tempFilePath,
            type: res.type,
          }
          if (m.type === 'video') {
            m.duration = item.duration
            m.height = item.height
            m.width = item.width
            m.thumbPath = item.thumbTempFilePath
          }
          return m
        })
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
    // #endif

    // #ifdef MP-ALIPAY
    if (accept === 'video') {
      (my as any).chooseVideo({
        sourceType: capture,
        camera,
        compressed,
        maxDuration,
        success(e: any) {
          resolve([
            {
              url: '',
              name: '',
              size: e.size,
              path: e.tempFilePath,
              type: 'video',
              duration: e.duration,
              height: e.height,
              width: e.width,
              thumbPath: e.tempVideoThumbPath,
            },
          ])
        },
        fail(err: Error) {
          reject(err)
        },
      })
    }
    else {
      aliReadImage({
        count,
        useFrontCamera: camera === 'front',
        sizeType: [compressed ? 'compressed' : 'original'],
        sourceType: capture,
      })
        .then(res => resolve(res))
        .catch(e => reject(e))
    }
    // #endif

    // #ifdef H5
    h5ReadFile({
      accept: accept as InputAccept,
      multiple,
    })
      .then(res => resolve(res))
      .catch(e => reject(e))
    // #endif
    // #ifdef APP
    appReadFile({
      count,
      sourceType: capture,
      sizeType: [compressed ? 'compressed' : 'original'],
    }).then(res => resolve(res))
      .catch(e => reject(e))
    // #endif
  })
}

export function readFile(accept: 'all' | 'file' = 'all', count = 9, multiple = false): Promise<UploadFileType[]> {
  return new Promise((resolve, reject) => {
    if (count < 1)
      return reject(new Error('count不能小于1'))

    // #ifdef MP-WEIXIN
    wx.chooseMessageFile({
      type: accept,
      count,
      success: ({ tempFiles }) => {
        resolve(tempFiles as any as UploadFileType[])
      },
      fail: (err) => {
        reject(err)
      },
    })
    // #endif
    // #ifdef MP-ALIPAY
    aliReadImage({
      count,
    })
      .then(res => resolve(res))
      .catch(e => reject(e))
    // #endif
    // #ifdef H5
    h5ReadFile({
      accept,
      multiple,
    })
      .then(res => resolve(res))
      .catch(e => reject(e))
    // #endif
    // #ifdef APP
    appReadFile({ count }).then(res => resolve(res))
      .catch(e => reject(e))
    // #endif
  })
}

// #ifdef MP-ALIPAY
function aliReadImage({
  count,
  useFrontCamera,
  sizeType,
  sourceType,
}: {
  count: number
  useFrontCamera?: boolean
  sizeType?: Array<string>
  sourceType?: string | Array<string>
}): Promise<UploadFileType[]> {
  return new Promise((resolve, reject) => {
    (my as any).chooseImage({
      count,
      useFrontCamera,
      sizeType,
      sourceType,
      success({ tempFiles }: { tempFiles: { path: string, size: number }[] }) {
        const result = tempFiles.map((item) => {
          return {
            url: '',
            name: '',
            path: item.path,
            size: item.size,
            type: 'image',
          }
        })
        resolve(result)
      },
      fail(err: Obj) {
        reject(err)
      },
    })
  })
}
// #endif

// #ifdef H5
const h5FileType = {
  all: '*',
  file: '*',
  image: '.PNG,.JPG,.WEBP,.SVG,.GIF',
  video: '.mp4,.mov,.m4v,.3gp,.avi,.m3u8,.webm',
  media: '.PNG,.JPG,.WEBP,.SVG,.GIF,.mp4,.mov,.m4v,.3gp,.avi,.m3u8,.webm',
}

function h5ReadFile({ accept = 'image', multiple = false }: { accept: InputAccept, multiple: boolean }): Promise<UploadFileType[]> {
  return new Promise((resolve, reject) => {
    const ipt = document.createElement('input')
    ipt.style.display = 'none'
    ipt.setAttribute('type', 'file')
    if (multiple)
      ipt.setAttribute('multiple', 'true')

    ipt.setAttribute('accept', h5FileType[accept])
    document.body.appendChild(ipt)
    ipt.click()
    ipt.addEventListener('change', async (e) => {
      try {
        const files = (e.target as any)?.files as FileList

        const result = []
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          let type = file.type
          if (['image', 'video', 'media'].includes(accept))
            type = type.includes('video') ? 'video' : 'image'

          const resultItem = {
            url: '',
            name: file.name,
            path: URL.createObjectURL(file),
            type,
            size: file.size,
            file,
          }
          if (file.type.includes('video')) {
            const data = await getVideoFirstFrame(resultItem.path)
            Object.assign(resultItem, data)
          }
          result.push(resultItem)
        }

        resolve(result)
        document.body.removeChild(ipt)
      }
      catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * 获取视频首帧
 */
function getVideoFirstFrame(path: string) {
  return new Promise((resolve, reject) => {
    const video: HTMLVideoElement = document.createElement('video')
    video.src = path
    video.onloadedmetadata = function () {
      try {
        video.currentTime = 0.5
        video.addEventListener('canplay', () => {
          video.pause()
          const width = video.videoWidth
          const height = video.videoHeight
          const duration = video.duration

          setTimeout(() => {
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)
            const thumbPath = canvas.toDataURL('image/png')
            resolve({
              thumbPath,
              width,
              height,
              duration,
            })
          }, 50)
        })
      }
      catch (error) {
        reject(error)
      }
    }
  })
}
// #endif
// #ifdef APP
function appReadFile({ count, sizeType, sourceType }: { count: number, sizeType?: string[], sourceType?: string[] }): Promise<UploadFileType[]> {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count,
      sizeType,
      sourceType,
      success: ({ tempFiles }) => {
        resolve(tempFiles as any as UploadFileType[])
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
// #endif
export default {}
