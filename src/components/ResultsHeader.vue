<template>
    <el-row type="flex" justify="space-between">
        <el-col style="font-weight: bold">
            成绩单
        </el-col>
        <el-col :offset="15">
            <el-button type="primary" @click="handleAgain">再做一次</el-button>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "ResultsHeader",
        methods:{
            handleAgain(){
                this.$emit('again')
            }
        }
    }
</script>

<style scoped>

</style>