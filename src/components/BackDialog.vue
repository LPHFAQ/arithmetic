<template>
    <el-dialog
            title="提示"
            :visible.sync="visible"
            width="400px"
    >
        <span>题目将不会被保存，确定要返回？</span>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="handleVisible">取 消</el-button>
                  <el-button type="danger" @click="handleConfirm">确 定</el-button>
                </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "BackDialog",
        props:['visible'],
        methods:{
            handleVisible() {
                this.$emit('invisible')
            },
            handleConfirm(){
                this.handleVisible()
                this.$emit('confirm')
            }
        }
    }
</script>

<style scoped>

</style>