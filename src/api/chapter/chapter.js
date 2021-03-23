import request from '@/utils/request'

const api_name = '/eduservice/chapter'

export default {
  //根据课程id查找章节
  getAllChapterVideo(courseId) {
    return request({
      url: `${api_name}/getChapterVideo/${courseId}`,
      method: 'get'
    })
  },

  removeById(id) {
    return request({
      url: `${api_name}/deleteEduChapter/${id}`,
      method: 'delete'
    })
  },

  save(chapter) {
    return request({
      url: `${api_name}/addEduChapter`,
      method: 'post',
      data: chapter
    })
  },

  getById(id) {
    return request({
      url: `${api_name}/getEduChapter/${id}`,
      method: 'get'
    })
  },

  updateById(chapter) {
    return request({
      url: `${api_name}/updateEduChapter`,
      method: 'post',
      data: chapter
    })
  }
}
