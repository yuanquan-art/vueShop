<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert
        title="注意：只能修改第三级的参数"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            expand-trigger="hover"
            :options="catelist"
            :props="cateProps"
            v-model="selectedCateKeys"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>
      <!-- Tabs标签切换 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数按钮 -->
          <el-row>
            <el-col>
              <el-button
                type="primary"
                size="mini"
                :disabled="isBtnDisabled"
                @click="addDialogVisible = true"
                >添加参数</el-button
              >
            </el-col>
          </el-row>
          <!-- Table表格区域  -->
          <el-table :data="manyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand"></el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  class="el-icon-edit"
                  type="primary"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                ></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  class="el-icon-delete"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加属性按钮 -->
          <el-row>
            <el-col>
              <el-button
                type="primary"
                size="mini"
                :disabled="isBtnDisabled"
                @click="addDialogVisible = true"
                >添加属性</el-button
              >
            </el-col>
          </el-row>
          <!-- Table表格区域  -->
          <el-table :data="onlyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand"></el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="属性名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  class="el-icon-edit"
                  type="primary"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                ></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  class="el-icon-delete"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑动态参数对话框 -->
    <el-dialog
      :title="'修改'+titleText"
      :visible.sync="showEditDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品分类列表
      catelist: [],
      // 级联选择框的配置对象
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      // 级联选择框双向绑定到的数组
      selectedCateKeys: [],
      // 被激活的页签名称
      activeName: "many",
      //获取动态参数列表
      manyTableData: [],
      // 获取静态参数列表
      onlyTableData: [],
      // 添加对话框是否显示
      addDialogVisible: false,
      // 添加参数的表单数据对象
      addForm: {},
      // 添加表单的验证规则对象
      addFormRules: {
        attr_name: [
          {
            required: true, message: `请输入要添加的参数`, trigger: 'blur'
          }
        ]
      },
    // 控制编辑对话框的显示
    showEditDialogVisible: false,
    // 编辑的表单数据对象
    editForm: {
      attr_name: ''
    },
    editFormRules: {
      attr_name: [
         { required: true, message: '请编辑动态参数', trigger: 'blur' }
      ]
    }
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取商品分类数据列表
    async getCateList() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200) {
        return this.$message.error("获取数据列表信息失败！");
      }
      this.catelist = res.data;
    },
    // 级联选择框选中项变化，会触发这个函数
    handleChange() {
      this.getParamsData();
    },
    // Tab页签点击事件的处理函数
    handleTabClick() {
      this.getParamsData();
    },
    // 获取参数的列表数据
    async getParamsData() {
      // 证明选中的不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = [];
      }
      // 证明选中的是三级分类
      console.log(this.selectedCateKeys);
      // 根据所选分类的Id，和当前所处的面板，获取对应的参数
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes`,
        {
          params: {
            sel: this.activeName
          }
        }
      );
      if (res.meta.status !== 200) {
        return this.$message.error("获取参数列表失败");
      }
      if (this.activeName === "many") {
        this.manyTableData = res.data;
      } else {
        this.onlyTableData = res.data;
      }
    },
    // 监听对话框的关闭事件
    addDialogClosed(){
       this.$refs.addFormRef.resetFields();
    },
    // 添加动态参数或静态属性
    addParams() {
      this.$refs.addFormRef.validate(
       async valid => {
          // 表单预验证
          if (!valid){
            return ;
          }
          // 发起添加请求
        const {data:res} = await this.$http.post(`categories/${this.cateId}/attributes`,{
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          });
          if (res.meta.status !== 201){
            return this.$message.error('添加参数失败');
          }
          this.addDialogVisible =false;
          this.getParamsData();
          console.log(res)
        }
      )
    },
    // 控制弹出编辑对话框
    async showEditDialog(attr_id){
      const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes/${attr_id}`);
      if(res.meta.status !== 200){
        return ;
      }

      this.editForm.attr_name = res.data.attr_name;
      this.showEditDialogVisible = true;
    },
    // 重置修改的表单
    addDialogClosed(){
      this.$refs.editFormRef.resetFields();
    },
    // 点击确定按钮，发送编辑请求
    editParams(){}
  },
  // 计算属性
  computed: {
    // 如果按钮需要被禁用，则返回true,否则返回false
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true;
      }
      return false;
    },
    // 当前选中的三级分类的Id
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2];
      }
      return null;
    },
    // 动态计算标题的文本
    titleText() {
      if (this.activeName === "many") {
        return "动态参数";
      }
      return "静态属性";
    }
  }
};
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
