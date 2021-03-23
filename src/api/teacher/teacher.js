import request from "@/utils/request"

const api_name = '/eduservice/teacher'
export default{
    getList(){
      return request({
        url:`${api_name}/findAll`,
        method:'get',
        //data表示吧teacherQuery转换成json传递
      })
    },
    getTeacherListPage(pageNum,pageSize,teacherQuery){
        return request({
            url:`${api_name}/pageTeacherCondition/${pageNum}/${pageSize}`,
            method:'post',
            //data表示吧teacherQuery转换成json传递
            data:teacherQuery
        })
    },

    addTeacher(teacher){
        return request({
            url:`${api_name}/addTeacher`,
            method:'post',
            //data表示吧teacherQuery转换成json传递
            data:teacher
        })
    },
    removeById(teacherId) {
        return request({
            url: `${api_name}/deleteTeacher/${teacherId}`,
            method: 'delete'
        })
    },
    getById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    },
    updateById(teacher) {
        return request({
            url: `${api_name}/${teacher.id}`,
            method: 'put',
            data: teacher
        })
    }
}
