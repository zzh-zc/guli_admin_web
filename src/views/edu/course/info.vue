<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-form label-width="120px">

      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>

      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="subjectLevelOneChanged">
          <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subSubjectList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" placeholder="示例"/>
      </el-form-item>
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss/uploadFile'"
          class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from '@/api/course/course'
import subject from '@/api/subject/subject'
import teacher from '@/api/teacher/teacher'
export default {
  data() {
    return {
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      teacherList: [], // 讲师列表
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: {
        title: '',
        subjectId: '',
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: process.env.OSS_PATH + '/cover/default.jpg',
        price: 0
      },
      BASE_API:process.env.BASE_API,
      courseId:'',
    }
  },
  watch: {
    // $route(to, from) {
    //   console.log('watch $route')
    //   this.init()
    // }
  },
  created() {
    console.log('info created')
    if (this.$route.params && this.$route.params.id) {
      this.courseId =  this.$route.params.id
      this.getCourseInfoById(this.courseId);
    }else{
      // this.init();
      this.initSubjectList();
      this.initTeacherList();
    }
  },

  methods: {
    getCourseInfoById(courseId) {
      course.getCourseInfoById(courseId).then(res =>{
        if(res.code === 20000){
          this.courseInfo = res.data.item;
          subject.getNestedTreeList().then(response => {
            this.subjectNestedList = response.data.items
            for (let i = 0; i < this.subjectNestedList.length; i++) {
              if (this.subjectNestedList[i].id === this.courseInfo.subjectParentId) {
                this.subSubjectList = this.subjectNestedList[i].children
              }
            }
          })
          // 获取讲师列表
          this.initTeacherList()
        }
      })
    },
    // init() {
    //   if (this.$route.params && this.$route.params.id) {
    //     const id = this.$route.params.id
    //     console.log(id)
    //   }
    // },
    initSubjectList() {
      subject.getNestedTreeList().then(response => {
        this.subjectNestedList = response.data.items
      })
    },
    // 获取讲师列表
    initTeacherList() {
      teacher.getList().then(response => {
        this.teacherList = response.data.item
      })
    },
    subjectLevelOneChanged(value) {
      console.log(value)
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id === value) {
          this.subSubjectList = this.subjectNestedList[i].children
          this.courseInfo.subjectId = ''
        }
      }
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.courseInfo.id) {
        this.saveData()
      } else {
        this.updateData(this.courseInfo.id)
      }
    },

    // 保存
    saveData() {
      course.saveCourseInfo(this.courseInfo).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        return response// 将响应结果传递给then
      }).then(response => {
        this.$router.push({ path: '/edu/course/chapter/' + response.data.courseId })
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
        this.saveBtnDisabled = false
      })
    },

    updateData(val) {
      this.saveBtnDisabled = true
      course.updateCourseInfo(this.courseInfo).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        return response// 将响应结果传递给then
      }).then(response => {
        this.$router.push({ path: '/edu/course/chapter/' + response.data.courseId })
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: '保存失败'
        })
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res)// 上传响应
      console.log(URL.createObjectURL(file.raw))// base64编码
      this.courseInfo.cover = res.data.url
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
