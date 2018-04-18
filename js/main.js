var app = new Vue({
    el: '#app',
    data: {
        bomField: [],
        numberField: [],
        statusField: [],
        N: 15
    },
    methods: {
        fieldLeftClickAction: function (row, col) {
            if (this.bomField[row][col])
                alert("Bom")

        },
        fieldRightClickAction: function (row, col) {
            alert(row + " " + col)
        },
        createFieldNumber: function () {

            // bomFieldをfalseで囲った配列tempFieldを作成する
            falseLine = new Array(this.N + 2).fill(false)
            tempField = [falseLine]
            for (i = 0; i < this.N; i++) {
                line = []
                line.push(false)
                line = line.concat(this.bomField[i])
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
        createBomField: function () {
            for (i = 0; i < this.N; i++) {
                var line = []
                for (j = 0; j < this.N; j++) {
                    if (Math.random() < 0.1)
                        line.push(true)
                    else
                        line.push(false)
                }
                this.bomField.push(line)
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
        this.createBomField()
        this.createFieldNumber()
        this.createStatusField()
    }
})