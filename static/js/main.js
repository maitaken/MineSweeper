const { ipcRenderer } = require('electron');

ipcRenderer.on('set-level', function (event, level) {
    switch (level) {
        case 'easy':
            app.N = 10;
            break
        case 'normal':
            app.N = 15;
            break
        case 'hard':
            app.N = 20;
            break
    }
    app.setField();
});

const neighbor = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]

let app = new Vue({
    el: '#app',
    data: {
        field: [],
        isGameover: false,
        N: 10,
        LEVEL: 0.1,
        fieldStatus: {
            bomCount: 0,
            openCount: 0
        }
    },
    methods: {
        leftClickAction: function (row, col) {

            // GameOverの場合とフラグが立っている場合は
            // 左クリックを無効にする
            if (this.isGameover || this.field[row][col].flag) {
                return
            }

            // 爆弾だったらゲームオーバー
            if (this.field[row][col].bom) {
                this.gameover()
                return
            }

            // セルのオープン
            this.openCell(row, col)
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
            let queue = []
            queue.push([row, col])

            // 幅優先探索でセルを開く
            while (queue.length) {
                var row, col
                [row, col] = queue.shift()

                if (this.field[row][col].open) {
                    continue;
                }

                this.field[row][col].flag = false
                this.field[row][col].open = true

                this.fieldStatus.openCount++;


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
        setField: function () {
            this.field = []
            this.isGameover = false
            this.fieldStatus = {
                bomCount: 0,
                openCount: 0
            }

            for (let i = 0; i < this.N; i++) {
                var row = []
                for (let j = 0; j < this.N; j++) {

                    //todo
                    var isBom

                    if (Math.random() < this.LEVEL) {
                        isBom = true
                        this.fieldStatus.bomCount++;
                    }
                    else {
                        isBom = false
                    }

                    row.push({
                        "bom": isBom,
                        "flag": false,
                        "open": false,
                        "state": 0
                    })
                }
                this.field.push(row)
            }

            for (let i = 0; i < this.N; i++) {
                for (let j = 0; j < this.N; j++) {

                    if (!this.field[i][j].bom)
                        continue

                    for (diff of neighbor) {
                        var nextRow = i + diff[0]
                        var nextCol = j + diff[1]

                        if ((nextRow >= 0 && nextRow < this.N) && (nextCol >= 0 && nextCol < this.N))
                            this.field[nextRow][nextCol].state++

                    }
                }
            }

        },
        gameover: function () {
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
    computed: {
        isClear: function () {
            return this.fieldStatus.openCount + this.fieldStatus.bomCount == this.N * this.N
        }
    },
    created: function () {
        this.setField()
    }
})