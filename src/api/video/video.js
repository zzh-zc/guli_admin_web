import request from '@/utils/request'

const api_name = '/eduservice/video'

export default {

  saveVideoInfo(videoInfo) {
    return request({
      url: `${api_name}/saveVideoInfo`,
      method: 'post',
      data: videoInfo
    })
  },

  getVideoInfoById(id) {
    return request({
      url: `${api_name}/getVideoInfo/${id}`,
      method: 'get'
    })
  },

  updateVideoInfoById(videoInfo) {
    return request({
      url: `${api_name}/updateVideoInfo`,
      method: 'post',
      data: videoInfo
    })
  },

  removeById(id) {
    return request({
      url: `${api_name}/deleteVideoInfo/${id}`,
      method: 'get'
    })
  }
}
