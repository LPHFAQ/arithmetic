<template>
    <el-dialog
            title="提示"
            :visible.sync="visible"
            width="400px"
    >
        <span>题目{{percentage==100?'已经':'尚未'}}完成，确定要提交？</span>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="handleVisible">取 消</el-button>
                  <el-button :type="percentage==100?'primary':'danger'" @click="handleConfirm">确 定</el-button>
                </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "SubmitDialog",
        props:['percentage','visible'],
        methods:{
            handleVisible(){
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