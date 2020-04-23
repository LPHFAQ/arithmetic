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
                            item['input'] = input
                            results.wrong.items.push(item)
                        }
                    }
                }
                return results
            },

            /*
            generate(settings){
                let items = []
                for(let i = 0;i<settings.total;i++){
                    let a = Math.ceil(50*Math.random())
                    let b = Math.ceil(50*Math.random())+50
                    items.push({id:i+1,quiz:b-a+'+'+a,ans:b})
                }
                return items
            },
             */
            isprime(a)//判断是否为素数
            {
                var go = 1
                if (a == 1) { return false }
                if (a == 2) { return false }
                if (a == 3) { return false }
                for (let i = 2; i < Math.floor(a / 2) + 1; i++) {
                    if (Math.floor(a / i) != a / i) {
                        go = go * 1
                    }
                    else {
                        go = 0
                        break
                    }
                }

                if (go == 0) { return true }
                if (go == 1) { return false }
            },


            findfactor(a)//找到因子
            {
                let factor = []
                for (let i = 2; i < (Math.floor(a / 2) + 1); i++) {
                    if (Math.floor(a / i) == a / i) {
                        factor.push(i)
                    }
                }
                let go = Math.floor(Math.random() * (factor.length))
                return factor[go]
            },



            createsentence(a, ccc) {
                let one
                let two
                let symbol
                switch (ccc) {
                    case 0://加法
                        one = Math.floor(Math.random() * (a - 2)) + 1//随机生成一个比a小的数
                        two = a - one
                        symbol = "+"
                        this.settings.plus = this.settings.plus + 1
                        break

                    case 1://减法
                        one = Math.floor(Math.random() * (100 - a)) + 1 + a //随机生成 比a大的数
                        two = one - a
                        symbol = "-"
                        this.settings.minus = this.settings. minus + 1
                        break

                    case 2://乘法
                        one = this.$options.methods.findfactor(a)               //选择a的一个因子
                        two = a / one
                        symbol = "×"
                        this.settings.times = this.settings.times + 1
                        break

                    case 3://除法
                        two = Math.floor(Math.random() * Math.floor(100 / a)) + 1//随机成除数
                        one = two * a
                        symbol = "÷"
                        this.settings.divide = this.settings.divide + 1
                        break
                }
                let u = []
                u=[one , symbol ,two]
                return u  //返回一个算式的三个部分 操作数 操作符 操作数
            },



            generateran(a) {
                if (a == 1) {
                    let go = [1, 3]
                    return go[Math.floor(Math.random() * 2)]
                }
                if (a == 100) {
                    let go = [0, 2]
                    return go[Math.floor(Math.random() * 2)]

                }
                if (a > 50) {
                    let go = [0, 1]
                    return go[Math.floor(Math.random() * 2)]
                }
                if (!this.isprime(a)) {
                    let go = [0, 3, 1]
                    return go[Math.floor(Math.random() * 3)]
                }

                return Math.floor(Math.random() * 4)

            },


            generate(settings) {
                this.settings = settings
                var test = []

                if (this.settings.operator == 1) {//一个操作符的情况
                    for (let i = 0; i < this.settings.total; i++) {
                        let go = Math.floor(Math.random() * 100) + 1//生成一个数作为结果1
                        let v = this.createsentence(go, this.generateran(go)) //生成一个算式的三个部分
                        /*for (let n = 0; n < test.length; n++) {//遍历数组找出相同的，分两类查找  * +一类   / - 一类
                            if ((go == test[n].ans) && (v[1] == alert(test[n].quiz.substr(1,1)))) {
                                if (v[1] == "*" || v[1] == "+") {
                                    if ((v[0] == alert(test[n].quiz.substr(0, 1)) && v[2] == alert(test[n].quiz.substr(2, 1))) || (v[0] == alert(test[n].quiz.substr(2, 1))) && v[2] == alert(test[n].quiz.substr(0, 1))) {
                                        i = i - 1
                                        break
                                    }

                                }
                               else {
                                    if (v[0] == alert(test[n].quiz.substr(0, 1)) && v[2] == alert(test[n].quiz.substr(2, 1))) {
                                        i = i - 1
                                break
                            }
                                }

                            }

                        }*/
                        var obj = { id: i+1, quiz: v[0] + v[1] + v[2], ans: go }//赋值
                        test.push(obj)
                    }
                }

                if (this.settings.operator == 2) {//2个操作符
                    if (this.settings.bracket == false)//没有括号
                    {
                        for (let i = 0; i < this.settings.total; i++) {
                            let go = Math.floor(Math.random() * 100) + 1
                            var move = this.generateran(go)//随机生成第一个结果，算式
                            while (move == 2 || move == 3) {   // 乘除不可以进行这种在分解 不包含括号的操作，只有加减可以，先排除乘除
                                move = this.generateran(go)
                            }
                            let v = this.createsentence(go, move)
                            let p = Math.floor(Math.random() * 2)
                            let m
                            if (v[1] == "+") {//加有两种方式，两个家数都可以迭代，随机选一个
                                switch (p) {
                                    case 0:
                                        m = this.createsentence(v[0], this.generateran(v[0]))
                                        obj = { id: i+1, quiz: m[0] + m[1] + m[2] + v[1] + v[2], ans: go }
                                        break
                                    case 1:
                                        m = this.createsentence(v[2], this.generateran(v[2]))
                                        obj = { id: i+1, quiz: v[0] + v[1] + m[0] + m[1] + m[2], ans: go }
                                        break
                                }
                            }
                            if (v[1] == "-") {//减只可以被再迭代
                                m = this.createsentence(v[0], this.generateran(v[0]))
                                obj = { id: i+1, quiz: m[0] + m[1] + m[2] + v[1] + v[2], ans: go }
                            }
                            test.push(obj)
                        }
                    }


                    else {//有括号的情况，随便迭代没有限制
                        for (let i = 0; i < this.settings.total; i++) {
                            let go = Math.ceil(Math.random() * 100)
                            let u = this.generateran(go)
                            let v = this.createsentence(go, u)//还是随机生成结果，第一个算式
                            let p = Math.floor(Math.random() * 2)
                            let m = []
                            switch (p) {
                                case 0:
                                    m = this.createsentence(v[0], this.generateran(v[0]))
                                    obj = { id: i+1, quiz: "(" + m[0] + m[1] + m[2] + ")" + v[1] + v[2], ans: go }//在赋值句里加上括号
                                    break
                                case 1:
                                    m = this.createsentence(v[2], this.generateran(v[2]))
                                    obj = { id: i+1, quiz: v[0] + v[1] + "(" + m[0] + m[1] + m[2] + ")", ans: go }
                                    break
                            }

                            test.push(obj)
                        }
                    }
                }
                return test
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