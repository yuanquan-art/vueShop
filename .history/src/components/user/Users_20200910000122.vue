<template>
    <div>
         <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 --><el-input placeholder="请输入内容" >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        <el-card>
           <!-- 搜索与添加 -->
           <el-row :gutter="20">
               <el-col :span="8">
                  <el-input placeholder="请输入内容" >
                     <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
               </el-col>
               <el-col :span="4">
                <el-button type="primary">
                    添加按钮
                </el-button>
               </el-col>
           </el-row>
           <!-- 用户列表渲染 -->
           <el-table :data='userlist' border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="mobile"></el-table-column>
                <el-table-column label="角色" prop="role_name"></el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                       <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                       <!-- 删除按钮 -->
                       <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                       <!-- 分配角色按钮 -->
                       <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                             <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                      </el-tooltip>
                    </template>
                </el-table-column>
           </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
         userlist: [],
         userInfo: {
             query: '',
             pagenum: 1,
             pagesize: 2
         }
        }
    },
    created () {
        this.getUserList();
    },
    methods: {
      async getUserList () {
          const { data:res } = await this.$http.get('users',{params: this.userInfo});
          if (res.meta.status !== 200) {
              return this.$message.err('获取用户列表失败');
          }
          this.userlist = res.data.users;
          this.total = res.data.total;
          console.log(res)
      }
    }
}
</script>

<style lang="less" scoped>

</style>