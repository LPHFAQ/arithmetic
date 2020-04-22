<template>
    <el-row type="flex" justify="space-between">
        <el-col :span="5">
            <el-button @click="handleBack">返回</el-button>
        </el-col>
        <el-col :span="16">
            <el-progress :stroke-width="25" :percentage=percentage></el-progress>
            <el-row style="font-size: 20px">
                <span >已完成  {{count}}  题</span>
                <el-divider direction="vertical"></el-divider>
                <span >剩余  {{settings.total - count}}  题</span>
                <el-divider direction="vertical"></el-divider>
                <span >共  {{settings.total}}  题</span>
            </el-row>
        </el-col>
        <el-col :span="4">
            <el-button type="primary" @click="handleSubmit">提交
            </el-button>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "TableHeader",
        props:['percentage','count','settings'],
        methods:{
            handleBack() {
                this.$emit('back')
            },
            handleSubmit(){
                this.$emit('submit')
            }
        }
    }
</script>

<style scoped>

</style>