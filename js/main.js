var app = new Vue({
    el: '#app',
    data: {
        numberField: [],
        statusField: [],
        N: 10,
        LEVEL: 0.2
    },
    methods: {
        fieldLeftClickAction: function (row, col) {
            if (this.numberField[row][col] == "B") {
                alert("Bom")
                return
            }
            this.openCell(row, col)
            console.log(this.statusField)
        },
        openCell: function (row, col) {
            queue = []
            queue.push([row, col])

            while (queue.length) {
                console.log(this.statusField)
                state = queue.shift(0)
                console.log(state)
                console.log(queue)

                row = state[0]
                col = state[1]

                this.statusField[row][col] = 1

                if (this.numberField[row][col] == 0) {
                    if (row > 0 && this.statusField[row - 1][col] == 0) {
                        queue.push([row - 1, col])
                    }
                    if (row < this.N - 1 && this.statusField[row + 1][col] == 0) {
                        queue.push([row + 1, col])
                    }
                    if (col > 0 && this.statusField[row][col - 1] == 0) {
                        queue.push([row, col - 1])
                    }
                    if (col < this.N - 1 && this.statusField[row][col + 1] == 0) {
                        queue.push([row, col + 1])
                    }
                }

            }
        },
        fieldRightClickAction: function (row, col) {
            alert(row + " " + col)
        },
        createField: function () {
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
                        line.push("B")
                    else {
                        cell = tempField[i + 1][j + 1] +
                            tempField[i + 1][j] +
                            tempField[i + 1][j - 1] +
                            tempField[i][j + 1] +
                            tempField[i][j - 1] +
                            tempField[i - 1][j + 1] +
                            tempField[i - 1][j] +
                            tempField[i - 1][j - 1]
                        line.push(cell)
                    }
                }
                this.numberField.push(line)
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

        this.createField()
        this.createStatusField()
    }
})