<template>
    <el-container>
        <el-header style="height: 30px">
            <el-row type="flex" justify="center">
                <el-pagination
                        background
                        layout="prev,pager,next"
                        :page-size="settings.page"
                        :total="settings.total"
                        :current-page.sync="currentPage"
                        @current-change="setShowItems"
                        style="padding-top: 0"
                ></el-pagination>
            </el-row>
        </el-header>
        <el-main style="padding-top: 0">
            <el-row type="flex" justify="center">
                <div class="table">
                    <el-table :data="showItems" height="420" style="width: 100%;font-size: 24px">
                        <el-table-column label="题号" prop="id" width="100">
                        </el-table-column>
                        <el-table-column min-width="200" label="题目" prop="quiz">
                        </el-table-column>
                        <el-table-column width="150">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.input" @blur="handleBlur"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Table",
        props:['settings'],
        data(){
            return{
                items:[],
                showItems:[],
                currentPage:1,
                ans:[],

            }
        },
        mounted(){
            this.setItems()
        },
        methods:{
            setItems(){
                this.items = this.generate(this.settings)
                this.showItems = this.items.slice((this.currentPage-1) * this.settings.page,this.currentPage * this.settings.page)
            },
            setShowItems(){
                this.showItems = this.items.slice((this.currentPage-1) * this.settings.page,this.currentPage * this.settings.page)
            },

            handleBlur(){
                var count = 0
                for(let item of this.items){
                    if(item.input!=undefined && item.input!=''){
                        count ++
                    }
                }
                this.$emit('setpercent',count)
            },
            judge(){
                var results = {
                    right:{
                        label:'正确',
                        items:[],
                    },
                    wrong:{
                        label:'错误',
                        items: [],
                    },
                    left:{
                        label:'空题',
                        items: [],
                    },

                }
                for(let item of this.items){
                    let ans = item.ans
                    let input = item.input
                    if(input == undefined || input == ''){
                        results.left.items.push(item)
                    }else{
                        if(ans == input){
                            results.right.items.push(item)
                        }else{
                            results.wrong.items.push(item)
                        }
                    }
                }
                return results
            },
            generate(settings){
                let items = []
                for(let i = 0;i<settings.total;i++){
                    let a = Math.ceil(50*Math.random())
                    let b = Math.ceil(50*Math.random())+50
                    items.push({id:i+1,quiz:b-a+'+'+a,ans:b})
                }
                return items
            },
        }
    }
</script>

<style>
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #DCDFE6;
      border-radius: 3px;
    }
</style>