<template>
    <el-card style="margin-top:20px" shadow="hover">
        <el-container>
            <el-header style="text-align: center">
                <span style="font-size: 30px;font-weight: bold">{{result.label}}率</span>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-progress type="circle" :percentage='total===0?0:Math.round(100*result.items.length/total)' :color="progressColor"></el-progress>
                </el-aside>
                <el-main style="padding-top: 0">
                    <el-row v-for="(detail,key) in details" :key="key" type="flex">
                        <span style="margin-bottom: 12px;margin-right: 10px;width: 50px">{{detail.label}}</span>
                        <el-progress style="width: 100%" :percentage='details[key].percent' :color="progressColor"></el-progress>
                    </el-row>
                </el-main>
            </el-container>
            <el-footer v-if="result.items.length>0" :height='collapse?"100":"400"' style="text-align: center">
                <el-button ref="button" style="width:50%" @click="handleCollapse">{{collapse?'查看':'收起'}}题目</el-button>
                <el-table v-if="!collapse" :data="result.items" height="350" style="width: 100%;font-size: 24px">
                    <el-table-column label="题号" prop="id" width="100">
                    </el-table-column>
                    <el-table-column min-width="170" label="题目" prop="quiz">
                    </el-table-column>
                    <el-table-column v-if="result.label === '错误'" label="误答" prop="input"></el-table-column>
                    <el-table-column width="100" label="答案" prop="ans">
                    </el-table-column>
                </el-table>
            </el-footer>
        </el-container>
    </el-card>
</template>

<script>
    export default {
        name: "ResultCard",
        props:['result','total'],
        data(){
            return{
                progressColor:'',
                details:{
                    '+':{label:'加法', percent:0},
                    '-':{label:'减法', percent:0},
                    '×':{label:'乘法', percent:0},
                    '÷':{label:'除法', percent:0}
                },
                collapse:true
            }
        },
        mounted(){
            this.setProgressColor()
            this.setDetails()
        },
        methods:{
            handleCollapse(){
                this.collapse = !this.collapse
            },
            setProgressColor(){
                var color = ''
                let label = this.result.label
                switch (label) {
                    case '正确':
                        color = '#67C23A'
                        break;
                    case '错误':
                        color = '#F56C6C'
                        break
                    default:
                        color = '#909399'
                }
                this.progressColor = color
            },
            setDetails(){
                if(this.result.items.length > 0){
                    var count = {'+':0, '-':0, '×':0, '÷':0}
                    var total = 0
                    for(var item of this.result.items){
                        let quiz = item.quiz
                        for(let i=0;i<quiz.length;i++){
                            let c = quiz.charAt(i)
                            if('+-×÷'.indexOf(c)>-1){
                                total ++
                                count[c] ++
                            }
                        }
                    }
                    for(let key in this.details){
                        this.details[key].percent = Math.round(100*count[key]/total)
                    }
                }


            }
        }

    }
</script>

<style scoped>
</style>