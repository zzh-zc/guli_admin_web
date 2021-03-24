import request from '@/utils/request'

const api_name = '/vod/video'

export default {
  removeById(id) {
    return request({
      url: `${api_name}/deleteVodById/${id}`,
      method: 'get'
    })
  }

}
