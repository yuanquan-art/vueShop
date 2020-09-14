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
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- Tag标签 -->
                <el-tag
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="item.id"
                  closable
                  @close = "handleClose(i)"
                >
                  {{ item }}</el-tag
                >
                <!-- 文本输入框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <!-- button按钮 -->
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
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
                  @click="deleteParams(scope.row.attr_id)"
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
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="item in scope.row.attr_vals"
                  :key="item.id"
                  closable
                >
                  {{ item }}
                </el-tag>
              </template>
            </el-table-column>
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
                  @click="deleteParams(scope.row.attr_id)"
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
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑动态参数对话框 -->
    <el-dialog
      :title="'修改' + titleText"
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
        <el-button type="primary" @click="editParams">确 定</el-button>
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
            required: true,
            message: `请输入要添加的参数`,
            trigger: "blur"
          }
        ]
      },
      // 控制编辑对话框的显示
      showEditDialogVisible: false,
      // 编辑的表单数据对象
      editForm: {
        attr_name: ""
      },
      //编辑表单的验证规则
      editFormRules: {
        attr_name: [
          { required: true, message: "请编辑动态参数", trigger: "blur" }
        ]
      },
      // 控制表单与按钮的切换
      inputVisible: false,
      // 文本输入框的属性
      inputValue: ''
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

      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
        // 控制输入框的显示与隐藏
        item.inputVisible = false;
        // 输入的文本框
        item.inputValue = '';
      });

      if (this.activeName === "many") {
        this.manyTableData = res.data;
      } else {
        this.onlyTableData = res.data;
      }
    },
    // 监听对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 添加动态参数或静态属性
    addParams() {
      this.$refs.addFormRef.validate(async valid => {
        // 表单预验证
        if (!valid) {
          return;
        }
        // 发起添加请求
        const { data: res } = await this.$http.post(
          `categories/${this.cateId}/attributes`,
          {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          }
        );
        if (res.meta.status !== 201) {
          return this.$message.error("添加参数失败");
        }
        this.addDialogVisible = false;
        this.getParamsData();
        console.log(res);
      });
    },
    // 控制弹出编辑对话框
    async showEditDialog(attr_id) {
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes/${attr_id}`
      );
      if (res.meta.status !== 200) {
        return;
      }

      this.editForm = res.data;
      this.showEditDialogVisible = true;
    },
    // 重置修改的表单
    addDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 点击确定按钮，发送编辑请求
    editParams() {
      this.$refs.editFormRef.validate(async valid => {
        //表单预验证
        if (!valid) return;
        //验证通过，发起编辑请求
        const { data: res } = await this.$http.put(
          `categories/${this.cateId}/attributes/${this.editForm.attr_id}`,
          {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName
          }
        );
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg);
        }
        this.$message.success("更新成功！");
        this.showEditDialogVisible = false;
        this.getParamsData();
      });
    },
    // 根据参数id删除对应的参数
    async deleteParams(attr_id) {
      const { data: res } = await this.$http.delete(
        `categories/${this.cateId}/attributes/${attr_id}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg);
      this.getParamsData();
    },
    // 点击按钮，控制切换
    showInput(row) {
      row.inputVisible = true;
      // 让文本框自动获得焦点
      // $nextTick 方法的作用，就是当页面上元素被重新渲染之后，才会指定回调函数中的代码
      this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    // 按钮失去焦点时，触发
    async handleInputConfirm(row) {
       // 优化
       if (row.inputValue.trim().length === 0){
         row.inputValue = '';
         row.inputVisible = false;
         return;
       }
       // 如果没有return,则证明输入的内容，需要做一些后续的处理
       row.attr_vals.push(row.inputValue.trim());
       row.inputValue = '';
       row.inputVisible = false
       // 需要发起请求，保存这次参数
     const {data:res} =await  this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`,{
         attr_name: row.attr_name,
         attr_sel: row.attr_sel,
         attr_vals: row.attr_vals.join(' ')
       });
       if (res.meta.status !== 200){
         return this.$message.error(res.meta.msg);
       }
       this.$message.success(res.meta.msg);
       console.log(res)
     }
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
.el-tag {
  margin: 15px;
}
.input-new-tag {
  width: 120px;
}
</style>
