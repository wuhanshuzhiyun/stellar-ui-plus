const CC_API_BASE_URL = "https://xssc.whzb.com/"

export default function uploadFile(path: string, tryNum = 1, dir = 'image') {
  return new Promise((resolve, reject) => {
    const options = {
      url: CC_API_BASE_URL + 'inte-mall-platform/api/upload/endpoint/put-file?dir=' + dir,
      filePath: path,
      name: 'file',
      header: {},
      method: 'POST',
    };
    uni.uploadFile(options).then(async (res) => {
      // 如果返回的数组第一个有值，则为异常
      if (res.statusCode === 200) {
        resolve(JSON.parse(res.data).data.url);
      } else {
        reject('上传接口statusCode状态码' + res.statusCode + '异常');
      }
    });
  });
}