import request from '@/utils/request'

const api_name = '/eduservice/course'

export default {
  saveCourseInfo(courseInfo) {
    return request({
      url: `${api_name}/saveCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  getCourseInfoById(courseId){
    return request({
      url: `${api_name}/getCourseInfoByCourseId/${courseId}`,
      method: 'get'
    })
  },
  updateCourseInfo(courseInfo){
    return request({
      url: `${api_name}/updateCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },

  getCoursePublishInfoById(id) {
    return request({
      url: `${api_name}/coursePublishInfo/${id}`,
      method: 'get'
    })
  },

  publishCourse(id) {
    return request({
      url: `${api_name}/publishCourse/${id}`,
      method: 'get'
    })
  },

  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/getAllCoursePage/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  removeById(id) {
    return request({
      url: `${api_name}/deleteCourse/${id}`,
      method: 'get'
    })
  }
}
