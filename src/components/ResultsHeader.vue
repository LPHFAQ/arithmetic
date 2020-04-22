<template>
    <el-row type="flex" justify="space-between">
        <el-col style="font-weight: bold">
            成绩单
        </el-col>
        <el-col :offset="15">
            <el-button type="primary">再做一次</el-button>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "ResultsHeader"
    }
</script>

<style scoped>

</style>