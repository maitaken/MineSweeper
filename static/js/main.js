// // レンダラプロセス（送信側）
// const { ipcRenderer } = require('electron') // ipc通信を読み込む

// ipcRenderer.on('change-level', function (event, args) {
//     app.N = args
//     app.reset()
// })

const neighbor = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]

var app = new Vue({
    el: '#app',
    data: {
        field: [],
        isGameover: false,
        N: 8,
        LEVEL: 0.12,
        bomCount: 0
    },
    methods: {
        leftClickAction: function (row, col) {

            // GameOverの場合とフラグが立っている場合は
            //左クリックを無効にする
            if (this.isGameover || this.field[row][col].flag) {
                return
            }

            //
            if (this.field[row][col].bom) {
                this.gameover()
                return
            }

            // 爆弾だったらアラート
            this.openCell(row, col)

            if (this.isClear()) {

                if (confirm("You Win!\nDo you play once more? "))
                    this.reset()
            }
        },
        rightClickAction: function (row, col) {

            // Gameover時の操作を無効にする
            if (this.isGameover) {
                return
            }

            if (!this.field[row][col].open)
                this.field[row][col].flag = !this.field[row][col].flag
        },
        openCell: function (row, col) {
            var queue = []
            queue.push([row, col])


            // 幅優先探索でセルを開く
            while (queue.length) {
                var row, col
                [row, col] = queue.shift()

                this.field[row][col].flag = false
                this.field[row][col].open = true

                // Fieldの数値が0でなければ終了
                if (this.field[row][col].state == 0) {

                    for (diff of neighbor) {
                        var nextRow = row + diff[0]
                        var nextCol = col + diff[1]

                        if (nextRow < 0 || nextCol < 0 || nextRow > this.N - 1 || nextCol > this.N - 1) {
                            continue
                        }

                        if (this.field[nextRow][nextCol].open == 0) {
                            queue.push([nextRow, nextCol])
                        }

                    }
                }

            }
        },
        resetField: function () {
            this.field = []
            this.isGameover = false

            var falseLine = new Array(this.N + 2).fill(false)

            var tempField = [falseLine]
            for (i = 0; i < this.N; i++) {
                var line = [false]
                for (j = 0; j < this.N; j++) {
                    if (Math.random() < this.LEVEL) {
                        line.push(true)
                        this.bomCount++;
                    }
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
                        "open": false,
                        "bom": tempField[i][j]
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
        },
        isClear: function () {
            for (row of this.field) {
                for (cell of row) {
                    if (cell.bom === cell.flag) {
                        continue
                    }
                    else {
                        return false
                    }
                }
            }
            return true
        },
        reset: function () {
            this.bomCount = 0
            this.resetField()
            this.createStatusField()
        },
        gameover: function () {
            alert("Bom")
            this.isGameover = true
            for (row of this.field) {
                for (cell of row) {
                    if (cell.bom) {
                        cell.open = true
                    }
                }
            }
        }
    },
    created: function () {
        this.reset()
    }
})