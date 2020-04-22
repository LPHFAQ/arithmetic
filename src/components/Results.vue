<template>
    <el-container>
        <el-card shadow="hover">
            <el-row type="flex" justify="center" style="font-size:20px;text-align: center">
                <el-col >
                    <p class="title">正确数</p>
                    <p class="number" style="color:#67C23A">{{results.right.items.length}}</p>
                </el-col>
                <el-col >
                    <p class="title">错误数</p>
                    <p class="number" style="color:#F56C6C">{{results.wrong.items.length}}</p>
                </el-col>
                <el-col >
                    <p class="title">空题数</p>
                    <p class="number" style="color:#909399">{{results.left.items.length}}</p>
                </el-col>
            </el-row>
        </el-card>
        <ResultCard v-for="(result,key) in results" :key="key" :result="result" :total="total"></ResultCard>
        <el-footer></el-footer>
    </el-container>

</template>

<script>
    import ResultCard from "@/components/ResultCard";

    export default {
        name: "Results",
        props:['results'],
        components: {ResultCard},
        mounted(){
            this.getTotal()
        },
        data(){
            return{
                total:0
            }
        },
        methods:{
            getTotal(){
                var results = this.results
                this.total =
                    results.right.items.length +
                    results.wrong.items.length +
                    results.left.items.length
            }
        }
    }
</script>

<style>
    .title{
        font-size: 15px;
    }
    .number{
        font-size: 35px;
    }
    p{
        margin:10px
    }
</style>