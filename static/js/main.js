var app = new Vue({
    el: '#app',
    data: {
        field: [],
        isGameover: false,
        N: 15,
        LEVEL: 0.10
    },
    methods: {
        fieldLeftClickAction: function (row, col) {

            if (this.isGameover) {
                return
            }

            // flagが立っていなかったらオープン
            if (!this.field[row][col].flag) {

                // bomだったらGameover
                if (this.field[row][col].bom) {
                    this.gameover()
                    return
                }

                // 再帰的にcellをopen
                this.openCell(row, col)

            }

            if (this.checkClear()) {
                this.allOpen()
                if (confirm("You Win!\nDo you play once more? "))
                    this.reset()
            }
        },
        fieldRightClickAction: function (row, col) {

            if (this.isGameover) {
                return
            }

            if (!this.field[row][col].open)
                this.field[row][col].flag = !this.field[row][col].flag
        },
        openCell: function (row, col) {
            queue = []
            queue.push([row, col])

            // ８近傍の相対距離
            neighbor = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]

            while (queue.length) {
                [row, col] = queue.shift()

                if (this.field[row][col].open) {
                    continue
                }
                else {
                    // flagをけしてcellをオープン
                    this.field[row][col].flag = false
                    this.field[row][col].open = true
                }

                // Fieldの数値が0でなければ終了
                if (this.field[row][col].state != 0) {
                    continue
                }
                // Fieldの数値が0であれば、幅優先でcellを開けていく

                for (diff of neighbor) {
                    [nextRow, nextCol] = [row + diff[0], col + diff[1]]

                    if (nextRow < 0 || nextCol < 0 || nextRow > this.N - 1 || nextCol > this.N - 1)
                        continue

                    if (this.field[nextRow][nextCol].open == 0)
                        queue.push([nextRow, nextCol])

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
        checkClear: function () {
            for (row of this.field) {
                for (cell of row) {
                    if (cell.bom || cell.open) {
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
        },
        allOpen: function () {
            for (row of this.field) {
                for (cell of row) {
                    if (cell.bom) {
                        cell.flag = true
                    }
                    else {
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