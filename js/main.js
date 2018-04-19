var app = new Vue({
    el: '#app',
    data: {
        field: [],
        N: 10,
        LEVEL: 0.2
    },
    methods: {
        fieldLeftClickAction: function (row, col) {
            if (this.field[row][col].state == "B") {
                alert("Bom")
                return
            }
            this.openCell(row, col)
        },
        openCell: function (row, col) {
            queue = []
            queue.push([row, col])

            // ８近傍の相対距離
            neighbor =[[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]]

            while (queue.length) {
                console.log(queue)
                state = queue.shift()

                row = state[0]
                col = state[1]

                this.field[row][col].open = true

                // Fieldの数値が0でなければ終了
                if(this.field[row][col].state!=0){
                    continue
                }
                // Fieldの数値が0であれば、幅優先でcellを開けていく

                for(diff of neighbor){
                    nextRow = row+diff[0]
                    nextCol = col+diff[1]

                    

                    if(nextRow<0||nextCol<0||nextRow>this.N-1||nextCol>this.N-1)
                        continue

                    // 
                    if(this.field[nextRow][nextCol].open == 0)
                        queue.push([nextRow,nextCol])

                    
                }

                // if (this.field[row][col].state == 0) {
                //     if (row > 0 && this.field[row - 1][col].open == 0) {
                //         queue.push([row - 1, col])
                //     }
                //     if (row < this.N - 1 && this.field[row + 1][col].open == 0) {
                //         queue.push([row + 1, col])
                //     }
                //     if (col > 0 && this.field[row][col - 1].open == 0) {
                //         queue.push([row, col - 1])
                //     }
                //     if (col < this.N - 1 && this.field[row][col + 1].open == 0) {
                //         queue.push([row, col + 1])
                //     }
                // }

            }
        },
        fieldRightClickAction: function (row, col) {
            this.field[row][col].flag = !this.field[row][col].flag 
        },
        resetField: function () {
            falseLine = new Array(this.N + 2).fill(false)

            tempField = [falseLine]
            for (i = 0; i < this.N; i++) {
                var line = [false]
                for (j = 0; j < this.N; j++) {
                    if (Math.random() < this.LEVEL)
                        line.push(true)
                    else
                        line.push(false)
                }
                line.push(false)
                tempField.push(line)
            }

            tempField.push(falseLine)

            // tempFieldから数値を算出

            for (i = 1; i < this.N + 1; i++) {
                line = []
                for (j = 1; j < this.N + 1; j++) {
                    if (tempField[i][j])
                        state = "B"
                    else {
                        state = tempField[i + 1][j + 1] +
                            tempField[i + 1][j] +
                            tempField[i + 1][j - 1] +
                            tempField[i][j + 1] +
                            tempField[i][j - 1] +
                            tempField[i - 1][j + 1] +
                            tempField[i - 1][j] +
                            tempField[i - 1][j - 1]
                    }
                    line.push({
                        "state": state,
                        "flag": false,
                        "open": false
                    })
                }
                this.field.push(line)
            }

        },
        createStatusField: function () {
            this.statusField = new Array(this.N)
            for (i = 0; i < this.N; i++) {
                this.statusField[i] = new Array(this.N).fill(0);
            }
        }

    },
    created: function () {
        this.resetField()
        this.createStatusField()
    }
})